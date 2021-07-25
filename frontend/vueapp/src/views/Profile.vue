<template>
<div >
<Navbar></Navbar>
<header class="bg-dark py-5">
 <div class="sub container align-center">
    <div class="row">
        <div class="col-md-12 title text-center text-white" id="header" v-if="InfosUser !=''">
            <img src="../assets/user-profile.png" alt="" id="profile">
            <h1 class="title text-uppercase" id="info-username">{{ InfosUser[0].username }}</h1>
            <h4 class="title">{{ InfosUser[0].email }}</h4>
        </div>
    </div>
 </div>
</header>
 <div class="content container align-center">
       <div class="row sections">
          <!-- Earnings (Monthly) Card Example -->
          <div class="col-md-4">
              <div class="card mb-3 text-white" style="background: #5D69FC">
                <div class="card-header"><h3>Défi validé</h3></div>
                  <div class="card-body">
                      <div class="row no-gutters align-items-center">
                          <table class="table" v-if="InfosUser !=''">
                          <tbody  v-for="(data, index) in  ValidateChallengeUser" :key="index" >
                            <tr>
                              <td class="text-white"><h5>{{ data.title }}</h5></td>
                              <td class="text-white"><h5><i :class="data.icon"></i></h5></td>
                            </tr>
                          </tbody>
                      </table>
                      </div>
                  </div>
              </div>
          </div>
           <div class="col-md-4">
              <div class="card mb-3" style="background: #FFF">
                <div class="card-header"><h3>Défi En cours</h3></div>
                  <div class="card-body" >
                      <div class="row no-gutters align-items-center">
                          <table class="table">
                          <tbody  v-for="(data, index) in  ChallengeUser" :key="index">
                            <tr v-if="data != null">
                              <td><h5>{{ data.title }}</h5></td>
                              <td><h5><i :class="data.icon"></i></h5></td> 
                            </tr>
                          </tbody>
                      </table>
                      </div>
                  </div>
              </div>
          </div>
           <div class="col-md-4">
              <div class="card mb-3 text-white" style="background: #9A1BBC">
                <div class="card-header"><h3>Groupes</h3></div>
                  <div class="card-body">
                      <div class="row no-gutters align-items-center">
                       <table class="table" v-if="InfosUser !=''">
                          <tbody  v-for="(data, index) in InfosUser[0].groups" :key="index">
                            <tr v-if="data != null">
                              <td class="text-white"><router-link :to = "{ name:'group', params: {id: data.id }}" class="group_name">{{ data.name }}</router-link></td>
                            </tr>
                          </tbody>
                          <tfoot v-if="InfosUser[0].id==id_current_user">
                            <tr>
                              <td>
                                <form class="row g-3" v-on:submit.prevent="add_group">
                                    <div class="col-auto">
                                      <input class="form-control mb-2 mr-sm-2" placeholder="Nom du groupe" name="name_group" v-model="name_group">
                                    </div>
                                    <div class="col-auto">
                                      <button type="submit" class="btn btn-primary "><i class="fas fa-plus"></i> Groupe</button>
                                    </div>
                                </form> 
                              </td>
                            </tr>
                            <tr>
                              <td v-if="MessageAddGroup !=''" class="text-white">{{ MessageAddGroup }}</td>
                            </tr>
                          </tfoot>
                      </table>
                      </div>
                  </div>
              </div>
          </div>
     </div>
 </div>
 <div class="container" v-if="InfosUser != ''">
   <div class="row list text-center" v-if="InfosUser[0].id==id_current_user">
      <div v-for="(data, index) in  ChallengeUser" :key="index">
            <div class="card" style="background: #FFF" v-if="data != null">
              <div class="card-header" style="background: #FFF">
                  <h5>{{ data.category }}</h5>
              </div>
              <div class="card-body">
                  <div class="card-body">
                      <h1><i :class="data.icon"></i></h1>
                      <h4 class="card-title">{{ data.title }}</h4>
                      <h5 v-if="data.difficult==4" style="color: #000000"><i class="fas fa-star fa-lg"></i></h5>
                      <h5 v-if="data.difficult==3" style="color: #F90404"><i class="fas fa-star fa-lg"></i></h5>
                      <h5 v-if="data.difficult==2" style="color: #1A1FB9"><i class="fas fa-star fa-lg"></i></h5>
                      <h5 v-if="data.difficult==1" style="color: #04F982"><i class="fas fa-star fa-lg"></i></h5>
                      <button type="submit" class="btn btn-outline-success" v-on:click="update_challenge(data, valid)">Valider</button>
                      <button type="submit" class="btn btn-outline-danger" v-on:click="delete_challenge(data.id)" id="give-up">Annuler</button>
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
    name: 'Profile',
    data () {
      return {
          APIData: [],
          id_current_user: localStorage.getItem('id'),
          valid: "Validé",
          cancel: "Annulé",
          name_group: null
        }
    },
    components: {
      Navbar,
      Footers,
    },
    computed: {
      ...mapGetters(['InfosUser']),
      ...mapGetters(['ChallengeUser']),
      ...mapGetters(['Groups']),
      ...mapGetters(['MessageAddGroup']),
      ...mapGetters(['ValidateChallengeUser'])
    
    },
    mounted () {
        this.$store.dispatch('getProfile', {  // mapactions
            id: this.$router.currentRoute.params.id //jest pour les test front
        });
        this.$store.dispatch('getUserChallenge', {
            id: this.$router.currentRoute.params.id,
            status: "En cours"
        });
        this.$store.dispatch('getUserChallenge', {
            id: this.$router.currentRoute.params.id,
            status: "Validé"
        });  
    },
    methods: {
      async update_challenge (data, status) { 
        await this.$store.dispatch("updateChallenge", {
          user_challenge: data,
          status: status
        });
        await this.$store.dispatch('getUserChallenge', {
            id: this.$router.currentRoute.params.id,
            status: "Validé"
        });
        await this.$store.dispatch('getUserChallenge', {
            id: this.$router.currentRoute.params.id,
            status: "En cours"
        }); 
      },
      async add_group () {
        await this.$store.dispatch("addGroup", {
          group: this.name_group
        })
        await this.$store.dispatch('getProfile', {  // mapactions
            id: this.$router.currentRoute.params.id //jest pour les test front
        });
      },
      async delete_challenge(id) {
        await this.$store.dispatch("deleteChallenge", {
          id: id
        });
        await this.$store.dispatch('getUserChallenge', {
            id: this.$router.currentRoute.params.id,
            status: "En cours"
        });
    }
  }
}
</script>

<style scoped>
h1 {
      font-size: 3em;
    }
button {
  margin-left: 20px;
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
  color: #ffff;
}

.group_name:hover{
  font-weight: bold;
}


</style>