import { getAPI } from '../api/axios-api'

const state = {
    list_challenges: [],
    info_user: [],
 }

const actions = {
  
  async getProfile(context, user) {
    const access = localStorage.getItem("access");
    let response = await getAPI.get(`/profile/${user.id}/`, { headers: { Authorization: `Bearer ${access}` }}  ) 
    state.info_user = response.data
  },
  async getUserChallenge(context, user) {
    const access = localStorage.getItem("access");
    let response = await getAPI.get(`users-challenges?user_id=${user.id}`, { headers: { Authorization: `Bearer ${access}` }}  ) 
    state.list_challenges = response.data.results
  },
}
   
const getters = {
  InfosUser: state => {
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