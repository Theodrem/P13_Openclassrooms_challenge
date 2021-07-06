<template>
<nav class="navbar navbar-expand-lg navbar-light">
  <div class="container-fluid">
    <a class="navbar-brand"><router-link :to = "{ name:'index' }" exact>GLOOT</router-link></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item" v-if="token==null"><router-link :to = "{ name:'login' }" class="nav-link">Login</router-link></li>
        <li class="nav-item" v-if="token!=null"><router-link :to = "{ name:'logout' }" class="nav-link">Logout</router-link></li>
        <li class="nav-item" v-if="token!=null"><router-link :to = "{ name:'profile', params: {id: user_id}}" class="nav-link">Mon compte</router-link></li>
        <li class="nav-item" v-if="token!=null"><router-link :to = "{ name:'challenge' }" class="nav-link">Défis</router-link></li>
        <li class="nav-item" v-if="token!=null"><router-link :to = "{ name:'actuality' }" class="nav-link">Actus</router-link></li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
  export default {
    name: 'Navbar',
     
    data () {
      return {
          token: localStorage.getItem('access'),
          user_id: localStorage.getItem('id')
        }
    }  
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
