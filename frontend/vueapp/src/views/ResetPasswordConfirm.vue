  
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
                            <h3 class="display-4">Nouveau mot de passe</h3>
                            <p class="text-muted mb-4">Le mot de passe doit faire au moins 8 caractères</p>
                            <p class="text-muted mb-4">Ne doit pas être trop courant</p>
                            <p class="text-muted mb-4">Ne peut pas contenir que des chiffres</p>
                            <p v-if="MessageReset != null">{{ MessageReset }}</p>
                            <form v-on:submit.prevent="send_password">
                              <div class="form-group">
                                <input type="password" name="password1" id="password" v-model="password1" class="form-control" placeholder="Mot de passe*">
                              </div>
                              <div class="form-group">
                                <input type="password" name="password2" id="pass" v-model="password2" class="form-control" placeholder="Confirmation mot de passe*">
                              </div>
                              <button type="submit" class="btn btn-primary btn-block text-uppercase mb-2 shadow-sm">Envoyer</button>
                            </form>
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
    name: 'reset-password-confirm',
    data () {
      return {
        password1: '',
        password2: '',
      }
    },
    components: {
      Navbar,
      Footer
    },
    computed: {
      ...mapGetters(['MessageReset'])
    },
    methods: {
        async send_password () {
            await this.$store.dispatch('resetPasswordConfirm', {
            password1: this.password1,
            password2: this.password2,
            token: this.$router.currentRoute.params.token
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