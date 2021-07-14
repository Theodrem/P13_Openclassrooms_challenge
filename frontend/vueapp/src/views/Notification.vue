<template>
<div id="body">
<Navbar></Navbar>
<div class="container align-items-center" style="margin-top:50px;">
    <div class="row justify-content-md-center">
        <div class="col-md-12 text-center align-items-center">
            <div class="card w-75">
            <div class="card-body">
                <h5 class="card-title">{{ ListInviatitons.description }}: <b>{{ ListInviatitons.group_name }}</b></h5>
                <div class="d-flex justify-content-around">
                  <button class="btn btn-primary" v-on:click="accept_invitation(ListInviatitons.group)">Accepter</button>
                  <a href="#" class="btn btn-danger" v-on:click="update_challenge()">Refuser</a>  
                </div>
            </div>
            </div>
        </div>
    </div>
</div>
    <Footers></Footers>
</div>
</template>

  
<script>
import Navbar from '../components/Navbar'
import { mapGetters } from 'vuex'
import Footers from '../components/Footers'
export default {
    name: 'notification',
    data () {
      return {
        id: null,
      }
     },
     components: {
      Navbar,
      Footers,
    },
    mounted () {
        this.$store.dispatch('getListInvitations');
    },
    computed: {
      ...mapGetters(['ListInviatitons']),
    
    },
    methods: {
    decline_invitation: function(data) { 
      this.id = data;
      this.$store.dispatch('addChallenge', { 
        id: this.id
      })
    },
    accept_invitation: function(data) { 
      this.$store.dispatch('addMember', { 
        group: data,
        user: localStorage.getItem('id')
      })
    }
  }
}


</script>

<style scoped>



</style>
