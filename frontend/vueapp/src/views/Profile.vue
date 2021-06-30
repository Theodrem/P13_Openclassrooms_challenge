<template>
<div>
 <Navbar></Navbar>
     <header class="masthead">
        <div class="container h-100">
            <div class="row h-100 align-items-center justify-content-center text-center">
               <div class="col-lg-10 align-self-end" id="async">
                    <h1 class="title">Profile</h1>
                        <div class="container cards d-flex">
                            <div v-for="(data, index) in  challengesUser.results" :key="index">
                                    <div class="card border-danger mb-3" style="max-width: 18rem;">
                                    <div class="card-body text-danger">
                                    <h1 v-if="data.category == 1"><i class="fas fa-basketball-ball"></i></h1>
                                    <h1 v-if="data.category == 2"><i class="fas fa-user-friends"></i></h1>
                                    <h4 class="card-title">{{ data.title }}</h4>
                                    <p class="text-muted">{{ data.description }}</p>
                                    <button type="submit" class="btn btn-primary btn-block text-uppercase mb-2 shadow-sm" v-on:click="get_id(data.id)">Ajouter</button>
                                    </div>
                                </div>          
                            </div>
                        </div>
               </div>
            </div>
        </div>
    </header>
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
        }
    },
    components: {
      Navbar,
      Footers,
    },
    computed: {
      ...mapGetters(['challengesUser']),
    
    },
    mounted () {
         this.$store.dispatch('getProfile')
    }
}
</script>

<style>
.page-section {
    margin-top: 40px;
}
header {
    margin-top: 100px;
}
.texte {
    margin-top: 50px;
}
</style>