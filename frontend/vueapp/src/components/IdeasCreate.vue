<template>
  <div>
      <form @submit.prevent="create">
          <label for="idea-title">Titre de l'idée</label>
          <input type="text" id="id_title" v-model="title"/>
          <button type="submit">Valider</button>
      </form>
  </div>
</template>

<script>
export default {
    data () {
        return {
            title: ""
        }
    },
    methods: {
        create() {
            const idea = {
                createAt: new Date(),
                title: this.title
            };
            this.$store.dispatch('createIdea', idea)

        }
    }

};
</script>

<style>

</style>