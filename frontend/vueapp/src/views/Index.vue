<template>
  <div class="index">
    <Navbar></Navbar>
     <header class="masthead">
        <div class="container h-100">
            <div class="row h-100 align-items-center justify-content-center text-center">
                <div class="col-lg-10 align-self-end" id="async">
                    <h1 class="title text-uppercase text-white"><b>Gloot</b></h1>
                    <h3 class="text-white">Réalise des défis quotidien et sors de ta routine.</h3>
                    <button class="btn btn-outline-dark btn-lg" v-if="token==null"><router-link :to = "{ name:'login' }" class="text-white text-decoration-none">LET'S GO</router-link></button>
                    <button class="btn btn-outline-dark btn-lg" v-if="token!=null"><router-link :to = "{ name:'challenge' }" class="text-white text-decoration-none">LET'S GO</router-link></button>
                </div>
                <section class="page-section" id="services">
            </section>
            </div>
        </div>
    </header>
    <!-- Services-->
  </div>
</template>
<script>
import Navbar from '../components/Navbar'
export default {
    name: 'Index',
    components: {
      Navbar,
    },
     data () {
      return {
          token: localStorage.getItem('access')
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
  margin-top: 70px;
 
}
.index {
  background:  linear-gradient(to bottom, rgba(21, 111, 122, 0.8) 0%, rgba(21, 111, 122, 0.8) 100%), url("../assets/back.jpg");
  height: 100vh;
}

#async {
  margin-top: 180px;
}
 
header.masthead {
  margin-top: 180px;
  
}
</style>

  