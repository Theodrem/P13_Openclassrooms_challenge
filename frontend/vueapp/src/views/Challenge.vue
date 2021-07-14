<template>
<div id="body">
 <Navbar></Navbar>
 <div class="sub container align-center">
    <div class="row">
        <div class="col-md-12 title text-center">
            <h1 id="liste" class="text-white" >Choisis des défis</h1>
        </div>
    </div>
    <div class="row list text-center">
      <div class="col-md-4 text-center" v-for="(data, index) in  challenges.results" :key="index">
            <div class="card" style="background: #fff">
              <div class="card-header">
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
    <Footers></Footers>
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
    created () {
      this.$store.dispatch("get_challenges")
    },
    computed: {
      ...mapGetters(['challenges']),
    
    },
    methods: {
    get_id: function(data) { 
      this.id = data;
    
      this.$store.dispatch('addChallenge', { 
        id: this.id
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



</style>

  