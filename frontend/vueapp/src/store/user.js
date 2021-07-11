import { getAPI } from '../api/axios-api'

const state = {
    list_users: [],
    message_email: null,
    message_reset: null
 }
 
const actions = {
  async getListUsers(context, user) {
    const access = localStorage.getItem("access")
    let response = await getAPI.get(`/profile/?username=${user.username}`, { headers: { Authorization: `Bearer ${access}` }}  ) 
    state.list_users = response.data
  },
  async postEmailReset(context, user) {
    const access = localStorage.getItem("access")
    let response = await getAPI.post(`/api/password_reset/`, {email: user.email}, { headers: { Authorization: `Bearer ${access}` }}  ) 
    console.log(response.data)
    state.message_email = response.data

  },
  async resetPasswordConfirm(context, user) {
    console.log(user)
    const access = localStorage.getItem("access")
    let response = await getAPI.post(`/api/password_reset/confirm/${user.token}`, {password: user.password1, token: user.token}, { headers: { Authorization: `Bearer ${access}` }}  )
    console.log(response.data)
    state.message_reset = response.data


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