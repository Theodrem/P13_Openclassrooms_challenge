  
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
                            <h3 class="display-4">Bienvue à toi!</h3>
                            <p class="text-muted mb-4">Connecte pour réaliser de nouveaux défis.</p>
                            <p v-if="MessageLog != null">{{ MessageLog }}</p>
                            <form v-on:submit.prevent="login">
                              <div class="form-group">
                                <input type="text" name="username" id="user" v-model="username" class="form-control" placeholder="Nom d'utilisateur*">
                              </div>
                              <div class="form-group">
                                <input type="password" name="password" id="pass" v-model="password" class="form-control" placeholder="Mot de passe*">
                              </div>
                              <button type="submit" class="btn btn-primary btn-block text-uppercase mb-2 shadow-sm">Envoyer</button>
                            </form>
                            <p class="text-muted">T'as pas de compte?<b><router-link :to = "{ name:'register' }" class="text-decoration-none">Inscrit toi.</router-link></b></p>
                            <p><b><router-link :to = "{ name:'reset-password' }" class="text-decoration-none">Mot de passe oublié?</router-link></b></p>
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
    name: 'login',
    data () {
      return {
        username: '',
        password: '',
      }
    },
    components: {
      Navbar,
      Footer
    },
    computed: {
      ...mapGetters(['MessageLog'])
    },
    methods: {
      async login () { 
        await this.$store.dispatch('userLogin', { 
          username: this.username,
          password: this.password
        })
        .then(() => {
          this.$store.dispatch('saveId', {
            username: this.username
          })
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
  background-image: url('../assets/back2.jpg');
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