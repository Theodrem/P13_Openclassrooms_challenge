<template>
  <div class="posts">
    <Navbar></Navbar>
        <header class="masthead">
        <div class="container h-100">
            <div class="row h-100 align-items-center justify-content-center text-center">
                <div class="col-lg-10 align-self-end">
                    <h1 class="title text-uppercase text-white"><b>Sort de ta zone de confort!</b></h1>
                    <button type="button" class="btn btn-outline-light btn-lg">LET'S GO</button>
                </div>
                <div class="col-lg-8 align-self-baseline">
                </div>
            </div>
        </div>
    </header>
    <!-- Services-->
    <section class="page-section" id="services">
        <div class="container">
            <h2 class="text-center mt-0 title"><b>On te propose des défis</b></h2>
               <div class="card" style="width: 18rem;">
                 <img class="card-img-top" src="../assets/back.jpg" alt="Card image cap">
                  <div class="card-body">
                    <h5 class="card-title">Marche 5 kilomètre</h5>
                    <p class="card-text">Marche 5 kilomètre ou tu veux, tu peux même les faire en courant. </p>
                    <a href="#" class="btn btn-outline-success">Accepter</a>
                  </div>
               </div>
        </div>
    </section>
    <!-- Contact-->
    <section class="page-section" id="contact">
      <Compteur></Compteur>
    </section>
     <section class="page-section" id="co">
      <div :key="challenge.id" v-for="(challenge) in APIData">
        <h3>{{ challenge.title }}</h3>
      </div>
    </section>
      <Footers></Footers>
  </div>
</template>

<script>
  import { getAPI } from '../api/axios-api'
  import Navbar from '../components/Navbar'
  import Footers from '../components/Footers'
  import Compteur from '../components/Concept'
  export default {
    name: 'Index',
    data () {
      return {
          APIData: []
        }
    },
    components: {
      Navbar,
      Footers,
      Compteur
    },
    mounted () {
        console.log("ddddd")
        const tok = localStorage.getItem('token')
        getAPI.get('/', { headers: { Authorization: `Bearer ${tok}` } })
          .then((response) => {
            this.APIData = response.data
            console.log(this.APIData)
          })
          .catch(err => {
            console.log(err)
          })
    }
  }
</script>

<style scoped>
header.masthead {
  padding-top: 10rem;
  padding-bottom: calc(10rem - 4.5rem);
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(53, 6, 6, 0.8) 100%), url("../assets/back3.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: scroll;
  background-size: cover;
  height: 100vh;
}
h1 {
      font-size: 5em;
    }
button {
  margin-top: 30px;
}
</style>

  