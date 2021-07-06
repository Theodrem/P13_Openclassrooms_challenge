<template>
<div id="body">
<Navbar></Navbar>
 <div class="sub container align-center">
    <div class="row">
        <div class="col-md-12 title text-center" id="header">
            <img src="../assets/user-profile.png" alt="" id="profile">
            <h1 class="title text-uppercase">{{ infosUser.username }}</h1>
            <h4 class="title">{{ infosUser.email }}</h4> 
            <h4>Défi validé: {{ ChallengeUser.length }}</h4>
        </div>
    </div>
    <div class="row list text-center">
      <div class="col-md-4 text-center" v-for="(data, index) in  ChallengeUser" :key="index">
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
                    <button v-if="infosUser.id==id_current_user" type="submit" class="btn btn-outline-success" v-on:click="get_id(data, valid)">Valider</button>
                    <button v-if="infosUser.id==id_current_user" type="submit" class="btn btn-outline-danger" v-on:click="get_id(data, cancel)" id="give-up">Annuler</button>
                </div>
            </div>
          </div>
        </div>
    </div>
 </div>
<Footers></Footers>
</div>
</template>

  >
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
          cancel: "Annulé"
        }
    },
    components: {
      Navbar,
      Footers,
    },
    computed: {
      ...mapGetters(['infosUser']),
      ...mapGetters(['ChallengeUser']),
    
    },
    mounted () {
         console.log(this.id_current_user);
         this.$store.dispatch('getProfile', {
            id: this.$router.currentRoute.params.id
        })
        this.$store.dispatch('getUserChallenge', {
            id: this.$router.currentRoute.params.id
        })
    },
    methods: {
      get_id (data, state) { 
        console.log(state)
        this.$store.dispatch("update_challenge", {
          user_challenge: data,
          state: state,
          
        })
      }
    }
}
</script>

<style scoped>
h1 {
      font-size: 5em;
    }
button {
  margin-top: 30px;
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
    width: 20rem;
    height: 28rem;
    margin-top: 30px;
}
.sub {
    
    margin-top: 200px;
}

.list {
    margin-top: 150px;
}

#body { 
  background:  linear-gradient(to bottom, rgba(104, 105, 105, 0.8) 0%, rgba(102, 105, 105, 0.8) 100%), url("../assets/team.png");
  background-position: center;
  height: 50vh;
}

#profile {
  height: 150px;
  width: 150px;
}

#header {
    background: #fff;
    padding: 4rem 1rem 4rem 1rem;
    box-shadow: 0 0 5px 5px rgba(0,0,0, 0.5);
    width: 400px;
}

</style>