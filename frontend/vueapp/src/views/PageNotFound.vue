<template>
<div id="body">
<Navbar></Navbar>
 <div class="sub container align-center">
    <div class="row">
        <div class="col-md-12 title text-center text-white" id="header">
            <h1 class="title text-uppercase">Page inexistante</h1>
            <h4 class="title">Retour sur le site <router-link :to = "{ name:'index' }" exact class="text-white">GLOOT</router-link></h4>
        </div>
    </div>
 </div>
<Footers></Footers>
</div>
</template>

  >
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

#body { 
  background:  linear-gradient(to bottom, rgba(128, 7, 7, 0.8) 0%, #201d1dcc 100%), url("../assets/paris.jpg");
  background-position: center;
  height: 50vh;
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