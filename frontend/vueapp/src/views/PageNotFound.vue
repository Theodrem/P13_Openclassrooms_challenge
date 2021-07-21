<template>
<div id="body">
<Navbar></Navbar>
<header class="bg-dark py-5">
    <div class="container px-5">
        <div class="row gx-5 align-items-center justify-content-center">
            <div class="col-lg-8 col-xl-7 col-xxl-6">
                <div class="my-5 text-center text-xl-start">
                    <h1 class="title text-uppercase text-white">Page inexistante</h1>
                    <h4 class="title text-white">Retour sur le site <router-link :to = "{ name:'index' }" exact class="text-white">GLOOT</router-link></h4>
                </div>
            </div>
            <div class="col-xl-5 col-xxl-6 d-none d-xl-block text-center"><img class="img-fluid rounded-3 my-5" src="../assets/lost.jpg" alt="..." /></div>
        </div>
    </div>
  </header>
<Footers></Footers>
</div>
</template>
<script>
import Navbar from '../components/Navbar'
import Footers from '../components/Footers'
export default {
    name: 'page-not-found',
    components: {
      Navbar,
      Footers,
    }
}
</script>

<style scoped>
h1 {
      font-size: 3em;
    }
button {
  margin-left: 20px;
}

#give-up {
  margin-left: 20px;
}

.page-section {
  margin-top: 40px;
 
}

header.masthead {
  margin-top: 150px;
  
}

.card {
    margin-top: 30px;
}
.sub {
    
    margin-top: 100px;
}

.list {
    margin-top: 150px;
}


#profile {
  height: 150px;
  width: 150px;
}

.sections {
  margin-top: 100px;
}

.group_name {
  text-decoration: none;
  color: black;
}

.group_name:hover{
  font-weight: bold;
}


</style>