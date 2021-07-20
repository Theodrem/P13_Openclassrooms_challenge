<template>
<div id="body">
<Navbar></Navbar>
<header class="bg-dark py-5">
 <div class="sub container align-center">
     <div class="row">
        <div class="col-md-12 title text-center text-white" id="header" v-if=" InfoGroup !=''">
            <img src="../assets/group.png" alt="" id="profile">
            <h1 class="title text-uppercase">{{ InfoGroup[0].name }}</h1>
            <h2 class="title">Groupe</h2>
            <button class="btn btn-light" v-on:click="quit_group(InfoGroup[0].id)">Quitter</button>
        </div>
    </div>
 </div>
</header>
 <div class="sub container align-center">
    <div class="row sections">
        <div class="col-md-8">
              <div class="card">
                      <div class="card-header"> 
                      <h4>Discute sur le groupe</h4> 
                      </div>
                      <div class="card-body">
                          <form v-on:submit.prevent="add_post">
                            <label class="sr-only" for="message">message</label>
                            <textarea class="form-control" id="message" rows="3" placeholder="Hello!" v-model="post" name="post"></textarea>
                            <button type="submit" class="btn btn-primary" style="margin-top: 20px;">Envoyer</button>
                          </form>
                      </div>
                </div>
          </div>
          <!-- Earnings (Monthly) Card Example -->
          <div class="col-md-4">
              <div class="card mb-3 text-white" style="background: #5D69FC">
                <div class="card-header"><h3>Membres</h3></div>
                  <div class="card-body">
                      <div class="row no-gutters align-items-center">
                          <table class="table">
                            <tbody  v-for="(data, index) in Members" :key="index">
                              <tr v-if="data != null">
                                <td class="text-white"><router-link :to = "{ name:'profile', params: {id: data.id}}" class="username">{{ data.username }}</router-link></td>
                              </tr>
                            </tbody>
                            <tfoot>
                              <tr>
                                <td>
                              <form class="row g-3" v-on:submit.prevent="search">
                                  <div class="col-auto">
                                    <input class="form-control mb-2 mr-sm-2" placeholder="Utilisateur" name="username" v-model="username">
                                  </div>
                                  <div class="col-auto">
                                    <button type="submit" class="btn btn-primary "><i class="fas fa-plus"></i> Joueur</button>
                                  </div>
                              </form> 
                                </td>
                              </tr>
                              <tr>
                              <td v-if="MessageUser !=''" class="text-white">{{ MessageUser }}</td>
                            </tr>
                            </tfoot>
                      </table>
                      </div>
                  </div>
              </div>
          </div>
          </div>
    </div>
    <div class="container text-center" style="margin-top:50px">
        <div class="row text-center">
          <div class="col-md-12 text-center">
              <div class="row no-gutters text-center"  v-if="ListUsers != ''">
                  <table class="table table-success table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Utilisateurs</th>
                        <th scope="col">Ajouter</th>
                      </tr>
                    </thead>
                      <tbody  v-for="(data, index) in  ListUsers" :key="index" >
                          <tr v-if="data != null">
                              <td><router-link :to = "{ name:'profile', params: {id: data.id}}" class="username">{{ data.username }}</router-link></td>
                              <td><button type="submit" class="btn btn-dark " v-on:click="add_user(data.id)"><i class="fas fa-plus"></i></button></td>
                          </tr>
                      </tbody>
                  </table>
            </div>
          </div>
        </div>
    <div class="row" v-if="ListPostsGroup !=''">
    <div class="col-md-12" v-for="(data, index) in ListPostsGroup" :key="index">
              <div class="card text-left" v-if="data != null">
                <div class="card-header text-left d-flex justify-content-around">
                  <h4 class="text-capitalize" >{{ data.username }}</h4>
                  <button class="btn btn-danger" v-on:click="delete_post(data.id)" v-if="data.id_user==current_user || current_user_is_staff=='true'">Supprimer</button>
                </div>
                  <div class="card-body">
                      <div class="row no-gutters align-items-center">
                          <h3>{{ data.text }}</h3>  
                      </div>
                  </div>
              </div>
          </div>
    </div>
 </div>
<Footers></Footers>
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
          current_user: localStorage.getItem("id"),
          current_user_is_staff: localStorage.getItem("is_staff"),
          username: "",
          post: "",

        }
    },
    components: {
      Navbar,
      Footers,
    },
    computed: {
      ...mapGetters(['Group']),
      ...mapGetters(['Members']),
      ...mapGetters(['ListUsers']),
      ...mapGetters(['ListPostsGroup']),
      ...mapGetters(['InfoGroup']),
      ...mapGetters(['MessageUser']),
    },
    mounted () {
        this.$store.dispatch('getGroup', {
            id: this.$router.currentRoute.params.id
        });
        this.$store.dispatch('getMembersGroup', {
            id: this.$router.currentRoute.params.id
        });
        this.$store.dispatch('getListPost', {
          group: this.$router.currentRoute.params.id
        });
    },
    methods: {
      async search () { 
        await this.$store.dispatch('getListUsers', {
          username: this.username,
        })
      },
      async add_user (user) { 
        await this.$store.dispatch('SendInvitation', {
          user: user,
          group: this.$router.currentRoute.params.id
        })
        await this.$store.dispatch('delListUsers')
      },
      async add_post () { 
        await this.$store.dispatch('addPost', {
          user: this.current_user,
          group: this.$router.currentRoute.params.id,
          text: this.post 
        });
        await this.$store.dispatch('getListPost', {
          group: this.$router.currentRoute.params.id
        });
      },
      async delete_post (id) { 
        console.log(id)
        await this.$store.dispatch('delPost', {
          id: id
        });
        await this.$store.dispatch('getListPost', {
          group: this.$router.currentRoute.params.id
        });
      },
      async quit_group(id) { 
        await this.$store.dispatch('quitGroup', { 
            group: id,
            user: this.current_user
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

.page-section {
  margin-top: 40px;
 
}

header.masthead {
  margin-top: 150px;
  
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

#body { 
  background:  linear-gradient(to bottom, rgba(128, 7, 7, 0.8) 0%, #201d1dcc 100%), url("../assets/paris.jpg");
  background-position: center;
  height: 50vh;
}

#profile {
  height: 150px;
  width: 150px;
}

.sections {
  margin-top: 100px;
}

.username {
  text-decoration: none;
  color: rgb(0, 0, 0);
}

.username:hover {
  font-weight: bold;
}


</style>