import { getAPI } from '../api/axios-api'

const state = {
    list_challenges: [],
    info_user: [],
 }

const actions = {
  async findUser(context, user) {
    const access = localStorage.getItem("access")
    console.log(user)
    let response = await getAPI.post(`/profile/get_by_username/`,{username: user.username}, { headers: { Authorization: `Bearer ${access}` }}  )  
    localStorage.setItem("user_search", response.data.id)
  },
  async getProfile(context, user) {
    const access = localStorage.getItem("access");
    let response = await getAPI.get(`/profile/${user.id}/`, { headers: { Authorization: `Bearer ${access}` }}  ) 
    state.info_user = response.data
  },
  async getUserChallenge(context, user) {
    const access = localStorage.getItem("access");
    let response = await getAPI.get(`users-challenges/user/${user.id}/`, { headers: { Authorization: `Bearer ${access}` }}  ) 
    console.log(response.data)
    state.list_challenges = response.data
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