<template>
<div id=body>
 <Navbar></Navbar>
 <header class="bg-dark py-5">
    <div class="container px-5">
        <div class="row gx-5 align-items-center justify-content-center">
            <div class="col-lg-8 col-xl-7 col-xxl-6">
                <div class="my-5 text-center text-xl-start">
                    <h1 class="title display-5 fw-bolder text-white mb-2">GLOOT</h1>
                    <p class="lead fw-normal text-white-50 mb-4">Réalise des défis que tu n'aurais jamais fait</p>
                    <div class="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xl-start">
                        <a class="btn btn-lg px-4 me-sm-3 text-white" href="#features" style="background: #C52528">Get Started</a>
                        <a class="btn btn-outline-light btn-lg px-4" href="#!">Learn More</a>
                    </div>
                </div>
            </div>
            <div class="col-xl-5 col-xxl-6 d-none d-xl-block text-center"><img class="img-fluid rounded-3 my-5" src="../assets/back2.jpg" alt="..." /></div>
        </div>
    </div>
  </header>
  <div class="py-5" v-if="id != null" style="background:A5BEC2">
        <div class="container px-5 my-5">
            <div class="row gx-5 justify-content-center">
                <div class="col-md-9">
                    <div class="text-center">
                       <h3 class="">Recherche des utilisateurs</h3>
                          <form v-on:submit.prevent="search">
                              <input type="text" name="username" id="user" v-model="username" class="form-control" placeholder="Nom d'utilisateur*">
                              <button type="submit" class="btn btn-outline-danger mb-2" id="submit"><b>Valider</b></button>
                          </form>
                    </div>
                </div>
            </div>
     </div>
        <div class="row align-items-center justify-content-center text-center">
               <div class="col-md-4">
                  <table class="table table-success table-striped" v-if="ListUsers.length != []">
                      <thead>
                        <tr>
                          <th scope="col">Utilisateurs</th>
                        </tr>
                      </thead>
                      <tbody  v-for="(data, index) in  ListUsers.results" :key="index" >
                          <tr>
                              <td><router-link :to = "{ name:'profile', params: {id: data.id}}" class="username">{{ data.username }}</router-link></td>
                          </tr>
                      </tbody>
                  </table>
                </div>
            </div> 
      </div>
  <section class="py-5" id="features">
        <div class="container px-5 my-5">
            <div class="row gx-5">
                <div class="col-lg-4 mb-5 mb-lg-0"><h2 class="fw-bolder mb-0">Prenez goût à l'aventure.</h2></div>
                <div class="col-lg-8">
                    <div class="row gx-5 row-cols-1 row-cols-md-2">
                        <div class="col mb-5 h-100">
                            <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i class="bi bi-collection"></i></div>
                            <h2 class="h5"><b>Insolite</b></h2>
                            <p class="mb-0">Fais des choses que tu n'aurais jamais osé faire.</p>
                        </div>
                        <div class="col mb-5 h-100">
                            <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i class="bi bi-building"></i></div>
                            <h2 class="h5"><b>Sportif</b></h2>
                            <p class="mb-0">Dépasse toi dans des défis sportifs.</p>
                        </div>
                        <div class="col mb-5 mb-md-0 h-100">
                            <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i class="bi bi-toggles2"></i></div>
                            <h2 class="h5"><b>Ecologique</b></h2>
                            <p class="mb-0">Parce que chaque geste compte. Change un peu tes habitudes pour consommer autrement.</p>
                        </div>
                        <div class="col h-100">
                            <div class="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i class="bi bi-toggles2"></i></div>
                            <h2 class="h5"><b>Social</b></h2>
                            <p class="mb-0">Fais de nouvelles rencontres et sors de ta zone de confort en société.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <Footer></Footer>
</div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Navbar from '../components/Navbar'
  import Footer from '../components/Footers'
  export default {
    name: 'index',
    data () {
      return {
        username: '',
        id: localStorage.getItem("id")
      }
    },
    components: {
      Navbar,
      Footer,
    },
    computed: {
      ...mapGetters(['ListUsers']),
    },
    methods: {
      search () { 
        this.$store.dispatch('getListUsers', {
          username: this.username,
        })

      }
    }
  }
</script>

<style scoped>
/*
*
* ==========================================
* CUSTOM UTIL CLASSES
* ==========================================
*
*/
.login,
.image {
  min-height: 100vh;
}

button {
  margin-top: 20px;
}

.form-control {
  margin-top: 20px;
}


.page-section {
  margin-top: 40px;
 
}

.cards {
  margin-top: 50px;
}

.username {
  text-decoration: none;
  color: black;
}

.username:hover {
  font-weight: bold;
}


.title  {
  font-size: 5rem;
}

section {
  background: #fff;
}

</style>

  