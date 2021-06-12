  
<template>
  <div>
  <Navbar></Navbar>
  <h1>Welcome to test page</h1>
  <IdeasCreate></IdeasCreate>
  <Ideas></Ideas>
  
  </div>
</template>


<script>
import Ideas from '../components/Ideas'
import IdeasCreate from '../components/IdeasCreate'
import Navbar from '../components/Navbar'

export default {
name: 'register',
data () {
    
},
components: {
    Navbar,
    Ideas,
    IdeasCreate,
},
methods: {

    }
}
</script>

<style>

</style>