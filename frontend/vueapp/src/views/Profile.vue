<template>
<div>
 <Navbar></Navbar>
     <header class="masthead">
        <div class="container h-100">
            <div class="row h-100 align-items-center justify-content-center text-center">
               <div class="col-lg-10 align-self-end" id="async">
                    <h1 class="title">{{ APIData.results[0].username }}</h1>
                    <p class="texte text-muted mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum eos, repellendus explicabo maxime quis aliquid nobis excepturi facere amet. Corporis magni dolores aliquam eum nam natus soluta labore rerum sit!</p>
                </div>
                <section class="page-section" id="services">
                    <div class="container d-flex">
                        <div :key="result.id" v-for="result in APIData.results">
                            <div class="card" style="width: 18rem;">
                                <img class="card-img-top" src="../assets/back.jpg" alt="Card image cap">
                                <div class="card-body">
                                    <h5 class="card-title">{{ result.challenge_name }}</h5>
                                    <p class="card-text">Marche 5 kilomètre ou tu veux, tu peux même les faire en courant. </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </header>
    <Footers></Footers>
</div>
</template>

<script>
import { getAPI } from '../api/axios-api'
import Navbar from '../components/Navbar'
import Footers from '../components/Footers'
export default {
    name: 'Profile',
    data () {
      return {
          APIData: [],
          display: []
        }
    },
    components: {
      Navbar,
      Footers,
    },
    mounted () {
        const token = localStorage.getItem("access")
        getAPI.get('profile/1', { headers: { Authorization: `Bearer ${token}` }})
          .then((response) => {
            this.APIData = response.data
            console.log(this.APIData.results)
          })
          .catch(err => {
            console.log(err)
          })
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