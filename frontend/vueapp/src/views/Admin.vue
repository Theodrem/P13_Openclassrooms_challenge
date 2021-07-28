<template>
<div >
<Navbar></Navbar>
<header class="bg-dark py-5">
    <div class="container px-5">
        <div class="row gx-5 align-items-center justify-content-center">
            <div class="col-lg-8 col-xl-7 col-xxl-6">
                <div class="my-5 text-center text-xl-start">
                    <h1 class="title display-5 fw-bolder text-white mb-2">Page admin</h1>
                </div>
            </div>
            <div class="col-xl-5 col-xxl-6 d-none d-xl-block text-center"><img class="img-fluid rounded-3 my-5" src="../assets/admin.jpg" alt="..." /></div>
        </div>
    </div>
</header>
 <div class="content container align-center">
       <div class="row sections">
          <!-- Earnings (Monthly) Card Example -->
          <div class="col-md-12">
              <div class="card mb-3" style="background: #ffff">
                  <div class="card-body">
                    <h5 class="card-title">Utilisateurs</h5>
                      <div class="row no-gutters align-items-center">
                          <table class="table">
                            <thead>
                                <tr>
                                  <th scope="col">Nom d'utilisateur</th>

                                  <th scope="col">Supprimer</th>
                                </tr>
                              </thead>  
                            <tbody  v-for="(data, index) in  AllUsers" :key="index" >
                                <tr>
                                    <td><router-link :to = "{ name:'profile', params: {id: data.id}}" class="group_name">{{ data.username }}</router-link></td>
                                    <td><button type="submit" class="btn btn-danger" v-on:click="del_user(data.id)"><i class="fas fa-minus"></i></button></td> 
                                </tr>
                            </tbody>
                      </table>
                      </div>
                  </div>
              </div>
          </div>
          <div class="col-md-12">
              <div class="card mb-3" style="background: #ffff">
                  <div class="card-body">
                    <h5 class="card-title">Groupe</h5>
                      <div class="row no-gutters align-items-center">
                          <table class="table">  
                            <thead>
                                <tr>
                                  <th scope="col">Nom</th>
                                  <th scope="col">Supprimer</th>
                                </tr>
                              </thead>
                            <tbody  v-for="(data, index) in  AllGroups" :key="index" >
                                <tr>
                                    <td><router-link :to = "{ name:'group', params: {id: data.id}}" class="group_name">{{ data.name }}</router-link></td>
                                    <td><button type="submit" class="btn btn-danger" v-on:click="del_group(data.id)"><i class="fas fa-minus"></i></button></td> 
                                </tr>
                            </tbody>
                      </table>
                      </div>
                  </div>
              </div>
          </div>
          <div class="col-md-12">
              <div class="card mb-3" style="background: #ffff">
                  <div class="card-body">
                    <h5 class="card-title">Défis</h5>
                      <div class="row no-gutters align-items-center">
                          <table class="table">  
                              <thead>
                                <tr>
                                  <th scope="col">Titre</th>
                                  <th scope="col">Supprimer</th>
                                </tr>
                              </thead>
                              <tbody  v-for="(data, index) in  challenges.results" :key="index" >
                                  <tr>
                                      <td>{{ data.title }}</td>
                                      <td><button type="submit" class="btn btn-danger" v-on:click="del_challenge(data.id)"><i class="fas fa-minus"></i></button></td> 
                                  </tr>
                              </tbody>
                      </table>
                      </div>
                  </div>
              </div>
              <div class="col-md-12">
              <div class="card mb-3" style="background: #ffff">
                  <div class="card-body">
                    <h5 class="card-title">Ajouter un défis</h5>
                      <div class="row no-gutters align-items-center">
                         <form v-on:submit.prevent="add_challenge">
                            <div class="form-group">
                              <label for="exampleFormControlInput1">Titre</label>
                              <input type="text" class="form-control" placeholder="Pars en week-end à Londres!" name="title" id="title" v-model="title">
                            </div>
                            <div class="form-group">
                              <label for="exampleFormControlInput1">Icon</label>
                              <input type="text" class="form-control"  placeholder="fas fa-running" name="icon" id="icon" v-model="icon">
                            </div>
                            <div class="form-group">
                              <label for="exampleFormControlSelect1">Difficulté</label>
                              <select class="form-control" name="difficult" id="difficult" v-model="difficult">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                              </select>
                            </div>
                             <div class="form-group">
                              <label for="exampleFormControlSelect1">Category</label>
                              <select class="form-control" name="category" id="category" v-model="category">
                                <option>Sportif</option>
                                <option>Environmental</option>
                                <option>Sensation</option>
                                <option>Social</option>
                                <option>Santé</option>
                                <option>Culture</option>
                              </select>
                            </div>
                            <button type="submit" class="btn btn-primary text-uppercase" style="margin-top: 10px">Envoyer</button>
                        </form>
                      </div>
                   </div>
                </div>
            </div>
        </div>
     </div>
 </div>
<Footers style="margin-top:50px;"></Footers>
</div>
</template>

<script>
import Navbar from '../components/Navbar'
import Footers from '../components/Footers'
import { mapGetters } from 'vuex'
export default {
    name: 'Admin',
    data () {
      return {
        title: '',
        category: '',
        difficult: '',
        icon: '',
      }
    },
    components: {
      Navbar,
      Footers,
    },
    computed: {
        ...mapGetters(['AllUsers']),
        ...mapGetters(['AllGroups']),
        ...mapGetters(['challenges']),
    },
    mounted () { 
        this.$store.dispatch('getAllUsers')
        this.$store.dispatch("get_challenges")
        this.$store.dispatch('getAllGroups')
      },
    methods: {
      // Delete select user with his id
        async del_user(id) {
           await this.$store.dispatch('delUser', {
               id: id,
            })
            this.$store.dispatch('getAllUsers')
        },
        async del_group(id) {
          // Delete select group with his id
           await this.$store.dispatch('delGroup', {
               id: id
            })
          //refresh list 
          await this.$store.dispatch('getAllGroups')
        },
        async del_challenge(id) {
          // Delete select challenge with his id
           await this.$store.dispatch('delChallenge', {
               id: id,
            })
          await this.$store.dispatch('get_challenges');
        },
        async add_challenge() {
          // Add new challenge
           await this.$store.dispatch('addChallenge', {
                title: this.title,
                category: this.category,
                difficult: this.difficult,
                icon: this.icon,
            })
          await this.$store.dispatch('get_challenges');
        },
        
    }
}

</script>

<style scoped>
h1 {
      font-size: 3em;
    }
#give-up {
  margin-left: 20px;
}

.card {
    margin-top: 30px;
}
.sub {
    
    margin-top: 100px;
}

.list {
    margin-top: 150px;
}


#profile {
  height: 150px;
  width: 150px;
}

.group_name {
  text-decoration: none;
  color: black;

}

.group_name:hover{
  font-weight: bold;
}


</style>