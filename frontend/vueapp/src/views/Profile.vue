<template>
<div id="body">
<Navbar></Navbar>
 <div class="sub container align-center">
    <div class="row">
        <div class="col-md-12 title text-center text-white" id="header">
            <img src="../assets/user-profile.png" alt="" id="profile">
            <h1 class="title text-uppercase">{{ InfosUser.username }}</h1>
            <h4 class="title">{{ InfosUser.email }}</h4>
        </div>
    </div>
       <div class="row sections">
          <!-- Earnings (Monthly) Card Example -->
          <div class="col-md-4">
              <div class="card mb-3 text-white" style="background: #5D69FC">
                <div class="card-header"><h3>Défi validé</h3></div>
                  <div class="card-body">
                      <div class="row no-gutters align-items-center">
                          <table class="table">
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
              <div class="card mb-3 text-white" style="background: #FC7A5D;">
                <div class="card-header"><h3>Défi En cours</h3></div>
                  <div class="card-body">
                      <div class="row no-gutters align-items-center">
                          <table class="table">
                          <tbody  v-for="(data, index) in  ChallengeUser" :key="index" >
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
              <div class="card mb-3 text-white" style="background: #9A1BBC">
                <div class="card-header"><h3>Groupes</h3></div>
                  <div class="card-body">
                      <div class="row no-gutters align-items-center">
                       <table class="table">
                          <tbody  v-for="(data, index) in Groups" :key="index">
                            <tr>
                              <td class="text-white" ><router-link :to = "{ name:'group', params: {id: data.id}}" class="group_name">{{ data.name }}</router-link></td>
                            </tr>
                          </tbody>
                          <tfoot v-if="InfosUser.id==id_current_user">
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
                          </tfoot>
                      </table>
                      </div>
                  </div>
              </div>
          </div>
     </div>

    <div class="row list text-center " v-if="InfosUser.id==id_current_user" >
      <div v-for="(data, index) in  ChallengeUser" :key="index">
            <div class="card" style="background: #FC7A5D;">
              <div class="card-header">
                  <h5>{{ data.category }}</h5>
              </div>
              <div class="card-body">
                  <div class="card-body">
                      <h1 class="text-white"><i :class="data.icon"></i></h1>
                      <h4 class="card-title">{{ data.title }}</h4>
                      <h5 v-if="data.difficult==4" style="color: #000000"><i class="fas fa-star fa-lg"></i></h5>
                      <h5 v-if="data.difficult==3" style="color: #F90404"><i class="fas fa-star fa-lg"></i></h5>
                      <h5 v-if="data.difficult==2" style="color: #1A1FB9"><i class="fas fa-star fa-lg"></i></h5>
                      <h5 v-if="data.difficult==1" style="color: #04F982"><i class="fas fa-star fa-lg"></i></h5>
                      <button type="submit" class="btn btn-outline-success" v-on:click="update_challenge(data, valid)">Valider</button>
                      <button type="submit" class="btn btn-outline-danger" v-on:click="update_challenge(data, cancel)" id="give-up">Annuler</button>
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
      ...mapGetters(['ValidateChallengeUser'])
    
    },
    mounted () {
        this.$store.dispatch('getProfile', {
            id: this.$router.currentRoute.params.id
        });
        this.$store.dispatch('getUserChallenge', {
            id: this.$router.currentRoute.params.id
        });
        this.$store.dispatch('getUserValidateChallenge', {
            id: this.$router.currentRoute.params.id
        });  
        this.$store.dispatch('getUserGroups');
    },
    methods: {
      async update_challenge (data, state) { 
        await this.$store.dispatch("update_challenge", {
          user_challenge: data,
          state: state
        });
      },

      async add_group () {
        await this.$store.dispatch("addGroup", {
          group: this.name_group
        });
        await this.$store.dispatch('addMember', {
          user: localStorage.getItem("id"),
          group: this.$store.getters.InfoGroup.id
        });
      },

      
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

.group_name {
  text-decoration: none;
  color: black;
}

.group_name:hover{
  font-weight: bold;
}


</style>