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
        <div class="col-md-3 title text-center">
            <h5 class="text-white">Difficulté Extrême: <i class="fas fa-star fa-lg" style="color: #000000"></i></h5>
        </div>
        <div class="col-md-3 title text-center">
            <h5 class="text-white">Difficulté Difficile: <i class="fas fa-star fa-lg" style="color: #F90404"></i></h5>
        </div>
        <div class="col-md-3 title text-center">
            <h5 class="text-white">Difficulté Normal: <i class="fas fa-star fa-lg" style="color: #1A1FB9"></i></h5>
        </div>
        <div class="col-md-3 title text-center">
            <h5 class="text-white">Difficulté Facile: <i class="fas fa-star fa-lg" style="color: #04F982"></i></h5>
        </div>
    </div>
  </header>
  <div class="container">
    <div class="row">
        <div class="col-md-12 title text-center">     
            <h6 v-if="MessageChallenge !=''" >{{ MessageChallenge }}</h6>
        </div>
    </div>
    <div class="row list text-center">
      <div class="col-md-4 text-center loop" v-for="(data, index) in  challenges.results" :key="index">
            <div class="card" style="background: #FFF">
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
                        <h5 v-if="data.difficult==1" style="scolor: #04F982"><i class="fas fa-star fa-lg"></i></h5>
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

  