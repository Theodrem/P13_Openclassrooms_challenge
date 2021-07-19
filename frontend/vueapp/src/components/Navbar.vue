<template>
<nav class="navbar navbar-expand-lg navbar-light">
  <div class="container-fluid">
    <a class="navbar-brand"><router-link :to = "{ name:'index' }" exact>GLOOT</router-link></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item" v-if="token==null"><router-link :to = "{ name:'login' }" class="nav-link">Connexion</router-link></li>
        <li class="nav-item" v-if="token!=null"><router-link :to = "{ name:'logout' }" class="nav-link">Déconnexion</router-link></li>
        <li class="nav-item" v-if="token!=null"><router-link :to = "{ name:'profile', params: {id: user_id}}" class="nav-link">Mon compte</router-link></li>
        <li class="nav-item" v-if="token!=null"><router-link :to = "{ name:'challenge' }" class="nav-link">Défis</router-link></li>
        <li class="nav-item" v-if="token!=null"><router-link :to = "{ name:'notification' }" class="nav-link">Invitation <i v-if="ListInvitations != ''" class="fas fa-exclamation-circle text-danger"></i></router-link></li>
        <li class="nav-item" v-if="token!=null && is_staff=='true'"><router-link :to = "{ name:'admin' }" class="nav-link">admin</router-link></li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'Navbar',
     
    data () {
      return {
          token: localStorage.getItem('access'),
          user_id: localStorage.getItem('id'),
          is_staff: localStorage.getItem('is_staff')
        }
    },
    mounted () {
      if (this.token != null) {
        this.$store.dispatch('getListInvitations');
      }   
    },
    computed: {
      ...mapGetters(['ListInvitations']),
      ...mapGetters(['MessageInvitation']),
    
    }, 
  }
</script>

<style scoped>
    a {
      text-decoration: none;
      color: rgb(0,0,0);
    }
    a:hover {
      color: rgb(0,0,0);
    }
    nav {
      background: #fff;
    }
</style>
