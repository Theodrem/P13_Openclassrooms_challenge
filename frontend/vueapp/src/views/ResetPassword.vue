  
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
                            <h3 class="display-4">Mot de passe oublié?</h3>
                            <p class="text-muted mb-4">Entre ton email.</p>
                            <p v-if="MessageSend != null">{{ MessageSend }}</p>
                            <form v-on:submit.prevent="reset">
                              <div class="form-group">
                                <input type="text" name="email" id="email" v-model="email" class="form-control" placeholder="Email*">
                              </div>
                              <button type="submit" class="btn btn-primary btn-block text-uppercase mb-2 shadow-sm">Envoyer</button>
                            </form>
                            <p><b><router-link :to = "{ name:'login' }" class="text-decoration-none">Connecte toi</router-link></b></p>
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
    name: 'reset-password',
    data () {
      return {
        email: '',
      }
    },
    components: {
      Navbar,
      Footer
    },
    computed: {
      ...mapGetters(['MessageSend'])
    },
    methods: {
    async reset () { 
       this.$store.dispatch('postEmailReset', {
          email: this.email
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