<template>
<div>
 <Navbar></Navbar>
     <header class="masthead">
        <div class="container h-100">
            <div class="row h-100 align-items-center justify-content-center text-center">
                <div class="col-lg-10 align-self-end" id="async">
                    <h1 class="title">Choisis un défi</h1>
                </div>
                <section class="page-section" id="services" v-if="display.length > 0">
                    <div class="container d-flex">
                        <div :key="challenge.id" v-for="(challenge) in APIData">
                            <div class="card" style="width: 18rem;">
                                <img class="card-img-top" src="../assets/back.jpg" alt="Card image cap">
                                <div class="card-body">
                                    <h5 class="card-title">{{ challenge.title }}</h5>
                                    <p class="card-text">Marche 5 kilomètre ou tu veux, tu peux même les faire en courant. </p>
                                    <a href="#" class="btn btn-outline-success">Accepter</a>
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
    name: 'Index',
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
        getAPI.get('')
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
  background: url("../assets/back.jpg");
}
 
header.masthead {
  margin-top: 150px;
  
}

</style>

  