import { getAPI } from '../api/axios-api'

const state = {
    list_challenges: []
 }

const actions = {
  async findUser(context, user) {
    console.log(user.username)
    const access = localStorage.getItem("access")
    let response = await getAPI.post('/dashboard/',{username: user.username}, { headers: { Authorization: `Bearer ${access}` }}  ) 
    localStorage.setItem("id", response.data.id)
  },
  async getProfile() {
    const access = localStorage.getItem("access");
    const id = localStorage.getItem("id")
    let response = await getAPI.get(`/profile/${id}`, { headers: { Authorization: `Bearer ${access}` }}  ) 
    state.list_challenges = response.data
  }
  
}
   
const getters = {
  challengesUser: state => {
    return state.list_challenges
  }
}

 export default {
    state,
    actions,
    getters
  };