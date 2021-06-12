<template>
    <div>
        <h2>{{ current }}</h2>
        <button @click="increment">+</button>
        <button @click="decrement">-</button>
    </div>
</template>
<script>
  export default {
      methods: {
          increment() {
              this.$store.commit('INCREMENT_COUNTER');
          },
          decrement(){
              this.$store.commit('DECREMENT_COUNTER');
          }
      },
      computed: {
          current() {
              return this.$store.state.current;
          }
      }
  }
</script>

<style scoped>

</style>
