<template>
  <div class="posts">
    <Navbar></Navbar>
      <div class="album py-5 bg-light">
          <div class="container">
            <div class="row">
              <div v-for="challenge in APIData" :key="challenge.id" class="col-md-4">
                <div class="card mb-4 box-shadow">
                  <div class="card-body">
                      <h4 class=""><a class="text-secondary" href="">{{challenge.title}}</a></h4>
                      <p>difficulté : {{ challenge.difficult }}</p>
                      <p>Categorie: {{ challenge.category }}</p>
                      <div class="d-flex justify-content-between align-items-center">
                      <div class="btn-group">
                      <a href="" class="btn btn-sm btn-outline-primary" role="button" aria-pressed="true">Accept</a>
                      <a href="" class="btn btn-sm btn-outline-secondary" role="button" aria-pressed="true">Edit</a>
                      </div>
                      <small class="text-muted">9 mins</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
  </div>
</template>

<script>
  import { getAPI } from '../axios-api'
  import Navbar from '../components/Navbar'
  import { mapState } from 'vuex'
  export default {
    name: 'Challenge',
    onIdle () {
      this.$store.dispatch('userLogout')
        .then(() => {
          this.$router.push({ name: 'login' })
        })
    },
    data () {
      return {
          APIData: []
        }
    },
    components: {
      Navbar
    },
    computed: mapState(['APIDATA']),
    created () {
        getAPI.get('http://127.0.0.1:8000/', { headers: { Authorization: `Bearer ${this.$store.state.accessToken}` } })
          .then((response) => {
            this.APIData = response.data
          })
          .catch(err => {
            console.log(err)
          })
    }
  }
</script>

<style scoped>
</style>