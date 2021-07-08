import { getAPI } from '../api/axios-api'

const state = {
    list_challenges: [],
    info_user: [],
 }

const actions = {
  async findUser(context, user) {
    const access = localStorage.getItem("access")
    let response = await getAPI.get(`/profile/?username=${user.username}`, { headers: { Authorization: `Bearer ${access}` }}  )  
    localStorage.setItem("user_search", response.data.id)
  },

  async getProfile(context, user) {
    const access = localStorage.getItem("access");
    let response = await getAPI.get(`/profile/${user.id}/`, { headers: { Authorization: `Bearer ${access}` }}  ) 
    state.info_user = response.data
  },
  async getUserChallenge(context, user) {
    const access = localStorage.getItem("access");
    let response = await getAPI.get(`users-challenges?user_id=${user.id}`, { headers: { Authorization: `Bearer ${access}` }}  ) 
    console.log(response.data.results)
    state.list_challenges = response.data.results
  }
  
}
   
const getters = {
  infosUser: state => {
    return state.info_user
  },
  ChallengeUser: state => {
    return state.list_challenges
  }
}

 export default {
    state,
    actions,
    getters
  };