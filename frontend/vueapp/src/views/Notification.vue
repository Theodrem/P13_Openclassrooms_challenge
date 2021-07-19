<template>
<div id="body">
<Navbar></Navbar>
 <div class="content container align-center">
       <div class="row sections">
          <!-- Earnings (Monthly) Card Example -->
          <div class="col-md-12">
              <div class="card mb-3" style="background: #ffff" v-if=" ListInvitations != ''">
                <div class="card-header"><h3>Invitation</h3></div>
                    <div class="card-body d-flex justify-content-around" v-for="(data, index) in  ListInvitations" :key="index">
                        <h5 class="card-title"><b>{{ data.sender_name }}</b>{{ data.description }}: <b>{{ data.group_name }}</b></h5>
                            <button class="btn btn-primary" v-on:click="accept_invitation(data.group, data.id)">Accepter</button>
                            <button class="btn btn-danger" v-on:click="decline_invitation(data.id)">Refuser</button>  
                    </div>
              </div>
              <h3 class="text-center" v-if="ListInvitations ==''">Pas de Notification</h3>
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
      ...mapGetters(['ListInvitations']),
      ...mapGetters(['MessageInvitation']),
    
    },
    methods: {
    async accept_invitation (data, id_invit) { 
      await this.$store.dispatch('acceptInvitation', { 
        group: data,
        user: localStorage.getItem('id')
      });
      await this.$store.dispatch('dropInvitation', {
        id: id_invit
      })
    },
    async decline_invitation (id_invit) { 
      await this.$store.dispatch('dropInvitation', {
        id: id_invit
      })
      await this.$store.dispatch('getListInvitations');
    },
  }
}


</script>

<style scoped>



</style>
