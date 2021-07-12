<template>
<div id="body">
<Navbar></Navbar>
 <div class="sub container align-center">
    <div class="row">
        <div class="col-md-12 title text-center text-white" id="header">
            <img src="../assets/user-profile.png" alt="" id="profile">
            <h1 class="title text-uppercase">{{ Group.name }}</h1>
            <h4 class="title"></h4>
        </div>
    </div>
    <div class="row sections">
          <!-- Earnings (Monthly) Card Example -->
          <div class="col-md-4">
              <div class="card mb-3 text-white" style="background: #5D69FC">
                <div class="card-header"><h3>Membres</h3></div>
                  <div class="card-body">
                      <div class="row no-gutters align-items-center">
                          <table class="table">
                          <tbody  v-for="(data, index) in Members" :key="index">
                            <tr>
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
                          </tfoot>
                      </table>
                      </div>
                  </div>
              </div>
          </div>
    </div>
    <div class="container text-center" style="margin-top:50px">
        <div class="row text-center">
          <div class="col-md-12 text-center">
              <div class="row no-gutters text-center"  v-if="ListUsers.length != []">
                  <table class="table table-success table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Utilisateurs</th>
                        <th scope="col">Ajouter</th>
                      </tr>
                    </thead>
                      <tbody  v-for="(data, index) in  ListUsers.results" :key="index" >
                          <tr>
                              <td><router-link :to = "{ name:'profile', params: {id: data.id}}" class="username">{{ data.username }}</router-link></td>
                              <td><button type="submit" class="btn btn-dark " v-on:click="add_user(data.id)"><i class="fas fa-plus"></i></button></td>
                          </tr>
                      </tbody>
                  </table>
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
          username: null
        }
    },
    components: {
      Navbar,
      Footers,
    },
    computed: {
      ...mapGetters(['Group']),
      ...mapGetters(['Members']),
      ...mapGetters(['ListUsers'])
    },
    mounted () {
        this.$store.dispatch('getGroup', {
            id: this.$router.currentRoute.params.id
        });
        this.$store.dispatch('getMembersGroup', {
            id: this.$router.currentRoute.params.id
        });
    },
    methods: {
      async search () { 
        await this.$store.dispatch('getListUsers', {
          username: this.username,
        })
      },
      async add_user (user) { 
        await this.$store.dispatch('addMember', {
          user: user,
          group: this.$router.currentRoute.params.id
        })
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