<template>
  <div>
      <h1>Les Idees</h1>
      <ul>
          <li v-for="idea in allIdeas" :key="idea.id">{{ idea.title }}</li>
      </ul>
  </div>
</template>

<script>
export default {
    computed: {
            allIdeas() {
                return this.$store.getters.allIdeas;
            }
            
     }
}
</script>
    
<style>

</style>