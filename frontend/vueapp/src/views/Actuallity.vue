<template>
<div>
 <Navbar></Navbar>
     <header class="masthead">
        <div class="container h-100">
            <div class="row h-100 align-items-center justify-content-center text-center">
                <div class="col-lg-10 align-self-end" id="async">
                    <h1 class="title">Ajoute un défi</h1>
                    <p class="text-muted mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum eos, repellendus explicabo maxime quis aliquid nobis excepturi facere amet. Corporis magni dolores aliquam eum nam natus soluta labore rerum sit!</p>
                    <button type="button" class="btn btn-lg btn-primary" @click="add">Ajouter</button>
                </div>
                <section class="page-section" id="services">
            </section>
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
     name: 'Actuallity',
    data () {
      return {
          APIData: []
        }
    },
    components: {
      Navbar,
      Footers,
    },
    methods: {
        add() {
            const idea = {
                createAt: new Date(),
                title: this.title
            };
            this.$store.dispatch('createIdea', idea)

        }
    }
}
</script>

<style>

</style>