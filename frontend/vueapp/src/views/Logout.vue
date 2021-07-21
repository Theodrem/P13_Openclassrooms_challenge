<template>
  <div class="log">
  </div>
</template>

<script>
  export default {
    async created () {
      // Redirect user to login page
      await this.$store.dispatch('userLogout')
      this.$router.push({ name: 'login' })
    }
  }
</script>
<style>
</style>