<template>
  <div>
  <Navbar></Navbar>
  <div class="container-fluid">
    <div class="row no-gutter">
        <!-- The image half -->
        <div class="col-md-6 d-none d-md-flex bg-image"></div>


        <!-- The content half -->
        <div class="col-md-6 bg-light">
            <div class="login d-flex align-items-center py-5">

                <!-- Demo content-->
                <div class="container">
                    <div class="row">
                        <div class="col-lg-10 col-xl-7 mx-auto">
                            <h3 class="display-4">Inscrit toidd!</h3>
                            <p class="text-muted mb-4">Le mot de passe doit contenir 8 caractères au minimum.</p>
                            <p class="text-muted mb-4">Le mot de passe ne doit pas contenir que des chiffres</p>
                            <p class="text-muted mb-4">Evite les mots de passe trop commun</p>

                            <p v-if="MessageReg != null">{{ MessageReg }}</p>
                            <form v-on:submit.prevent="register">
                                <div class="form-group">
                                <input type="text" name="username" id="user" v-model="username" class="form-control" placeholder="Nom d'utilisateur*">
                                </div>
                                <div class="form-group">
                                <input type="text" name="first_name" id="user" v-model="first_name" class="form-control" placeholder="Prenom">
                                </div>
                                <div class="form-group">
                                <input type="text" name="last_name" id="user" v-model="last_name" class="form-control" placeholder="Nom">
                                </div>
                                <div class="form-group">
                                <input type="text" name="email" id="user" v-model="email" class="form-control" placeholder="Email*">
                                </div>
                                <div class="form-group">
                                <input type="password" name="password" id="pass" v-model="password" class="form-control" placeholder="Mot de passe*">
                                </div>
                                <div class="form-group">
                                <input type="password" name="password2" id="pass2" v-model="password2" class="form-control" placeholder="Confirmation mot de passe*">
                                </div>
                                <button type="submit" class="btn btn-primary btn-block text-uppercase mb-2 shadow-sm">Envoyer</button>
                                      
                            </form>
                            <p class="text-muted">Déjà un compte?<b><router-link :to = "{ name:'login' }" class="text-decoration-none">Connecte toi.</router-link></b></p>
                        </div>
                    </div>
                </div><!-- End -->
                
            </div>
        </div><!-- End -->

    </div>
  </div>
<Footer></Footer>
</div>
</template>
 

<script>
  import Navbar from '../components/Navbar'
  import Footer from '../components/Footers'
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password2: '',
        
      }
    },
    components: {
      Navbar,
      Footer
    },
    computed: {
      ...mapGetters(['MessageReg'])
    },
    methods: {
      async register () {
        this.$store.dispatch('userRegister', {
          username: this.username,
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          password: this.password,
          password2: this.password2,
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

.bg-image {
  background-image: url('../assets/back3.jpg');
  background-size: cover;
  background-position: center center;
  padding: 25px 10px;
}
button {
  margin-top: 20px;
}

.form-control {
  margin-top: 20px;
}

</style>