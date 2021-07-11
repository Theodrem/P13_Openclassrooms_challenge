import { getAPI } from '../api/axios-api'

const state = {
    list_users: []
 }

const actions = {
  async getListUsers(context, user) {
    const access = localStorage.getItem("access")
    let response = await getAPI.get(`/profile/?username=${user.username}`, { headers: { Authorization: `Bearer ${access}` }}  ) 
    state.list_users = response.data
    //localStorage.setItem("user_search", response.data.id)
  },

}
   
const getters = {
  ListUsers: state => {
    return state.list_users
  },
}

 export default {
    state,
    actions,
    getters
  };