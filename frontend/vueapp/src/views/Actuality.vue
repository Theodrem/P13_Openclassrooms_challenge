<template>
<div>
 <Navbar></Navbar>
    <!-- Masthead-->
    <header class="masthead">
        <div class="container h-100">
            <div class="row h-100 align-items-center justify-content-center text-center">
                <div class="col-lg-10 align-self-end">
                    <h1 class="title text-white"><b>Recherche un utilisateur</b></h1>
                </div>
                <div class="col-lg-8 align-self-baseline">
                    <form v-on:submit.prevent="search">
                        <input type="text" name="username" id="user" v-model="username" class="form-control" placeholder="Nom d'utilisateur*">
                        <button type="submit" class="btn btn-light mb-2 text-white bg-success" id="submit"><b>Valider</b></button>
                    </form>
                </div>
            </div>
        </div>
    </header> 
    <Footer></Footer>
</div>
</template>

<script>
  import Navbar from '../components/Navbar'
  import Footer from '../components/Footers'
  export default {
    name: 'actuallity',
    data () {
      return {
        username: '',
      }
    },
    components: {
      Navbar,
      Footer
    },
    methods: {
      search () { 
        this.$store.dispatch('findUser', {
          username: this.username,
        })
        .then(() => {
          const user_search = localStorage.getItem("user_search")
          console.log(user_search)
          this.$router.push({ name:'profile', params: {id: user_search}})
        })
        .catch(err => {
          console.log(err)
          this.incorrectAuth = true
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

<style scoped>

header {
  padding-top: 10rem;
  padding-bottom: calc(10rem - 4.5rem);
  background: linear-gradient(to bottom, rgba(68, 68, 68, 0.1) 0%, rgba(94, 94, 94, 0.1) 100%), url("../assets/lna.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 50vh;
}

button {
  margin-top: 30px;
}

.page-section {
  margin-top: 40px;
 
}

header.masthead {
  margin-top: 150px;
  
}

.cards {
  margin-top: 50px;
}

form {
    margin-top: 50px;
}
</style>

  