<template>
<div>
 <Navbar></Navbar>
 <header class="bg-dark py-5">
    <div class="container px-5">
        <div class="row gx-5 align-items-center justify-content-center">
            <div class="col-lg-8 col-xl-7 col-xxl-6">
                <div class="my-5 text-center text-xl-start">
                    <h1 class="title display-5 fw-bolder text-white mb-2">CHOISIS TES DEFIS</h1>
                </div>
            </div>
            <div class="col-xl-5 col-xxl-6 d-none d-xl-block text-center"><img class="img-fluid rounded-3 my-5" src="../assets/back.jpg" alt="..." /></div>
        </div>
    </div>
    <div class="row">
        <div class="col-md-4 title text-center">
            <h5 class="text-white">Difficulté Difficile: <i class="fas fa-star fa-lg" style="color: #000000"></i></h5>
        </div>
        <div class="col-md-4 title text-center">
            <h5 class="text-white">Difficulté Normal: <i class="fas fa-star fa-lg" style="color: #F90404"></i></h5>
        </div>
        <div class="col-md-4 title text-center">
            <h5 class="text-white">Difficulté Facile: <i class="fas fa-star fa-lg" style="color: #1A1FB9"></i></h5>
        </div>
    </div>
  </header>
  <div class="container">
    <div class="row">
    </div>
    <div class="row list">
      <div class="col-md-4 loop" v-for="(data, index) in  challenges.results" :key="index">
            <div class="card" style="background: #FFF">
                <div class="card-header text-left" style="background: #FFF">
                    <h3 class="card-title">{{ data.category }}</h3>
                </div>
                <div class="card-body text-center">
                    <div class="card-body">
                        <h1  v-if="data.category=='Sportif'"><i :class="data.icon"  style="color: #EEC610"></i></h1>
                        <h1  v-if="data.category=='Santé'"><i :class="data.icon"  style="color: #2764C8"></i></h1>
                        <h1  v-if="data.category=='Environmental'"  style="color: #32AC30"><i :class="data.icon"></i></h1>
                        <h1  v-if="data.category=='Sensation'"  style="color: #C82736"><i :class="data.icon"></i></h1>
                        <h1  v-if="data.category=='Culture'"><i :class="data.icon"  style="color: #38C1B0"></i></h1>
                        <h1  v-if="data.category=='Social'"><i :class="data.icon"  style="color: #A900AE"></i></h1>

                        
                        <h4 class="card-title">{{ data.title }}</h4>
                        <h5 v-if="data.difficult==3" style="color: #000000"><i class="fas fa-star fa-lg"></i></h5>
                        <h5 v-if="data.difficult==2" style="color: #F90404"><i class="fas fa-star fa-lg"></i></h5>
                        <h5 v-if="data.difficult==1" style="color: #1A1FB9"><i class="fas fa-star fa-lg"></i></h5>
                        <button type="submit" class="btn btn-outline-dark" v-on:click="get_id(data.id)">Ajouter</button>
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
import { mapGetters } from 'vuex'
import Footers from '../components/Footers'
export default {
    name: 'Index',
    data () {
      return {
        id: null,
      }
     },
     components: {
      Navbar,
      Footers,
    },
    mounted () {
      this.$store.dispatch("get_challenges")
    },
    computed: {
      //Get all challenges and the messages if the user add challenge already exist 
      ...mapGetters(['challenges']),
      ...mapGetters(['MessageChallenge']),
    },
    methods: {
      //Get id for add user challenges
    async get_id(data) { 
      this.id = data;
      await this.$store.dispatch('addUserChallenge', { 
        id: this.id
      })
    }
    }
  }


</script>

<style scoped>
h1 {
      font-size: 4em;
  }

button {
  margin-top: 30px;
}

.page-section {
  margin-top: 40px;
 
}

.card {
    margin-top: 30px;
}

.list {
    margin-top: 150px;
}





</style>

  