<template>
  <div class="posts">
    <Navbar></Navbar>
      <div class="album py-5 bg-light">
          <div class="container">
            <div class="row">
              <div v-for="challenge in APIData" :key="challenge.id" class="col-md-4">
                <p>{{ challenge.title }}</p>
                <div class="card mb-4 box-shadow">
                  
                  <div class="card-body">
                      <h4 class=""><a class="text-secondary" href="">{{challenge.title}}</a></h4>
                      <div class="d-flex justify-content-between align-items-center">
                      <div class="btn-group">
                      <a href="" class="btn btn-sm btn-outline-primary" role="button" aria-pressed="true">View</a>
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
  import axios from 'axios'
  import Navbar from '../components/Navbar'
  export default {
    name: 'Challenge',
    data () {
      return {
          APIData: []
        }
    },
    components: {
      Navbar
    },
    mounted(){
        axios.get('http://127.0.0.1:8000/')
          .then((response) => {
            

            console.log(this.difficult)
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