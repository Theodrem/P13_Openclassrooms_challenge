import { getAPI } from '../api/axios-api'

const state = {
    accessToken: null,
    refreshToken: null,
 }
const mutations = {
    UPDATE_STORAGE (state, { access, refresh}) {
     localStorage.setItem("access", access);
     localStorage.setItem("refresh", refresh);
     state.accessToken = localStorage.getItem("access");
     state.refreshToken = localStorage.getItem("refresh");
   },
    DESTROY_TOKEN (state) {
     state.accessToken = null
     state.refreshToken = null
     localStorage.removeItem("access");
     localStorage.removeItem("refresh");
   }
 }
const actions = {
   async userLogout (context) {
     const access = localStorage.getItem("access")
     const refresh = localStorage.getItem("refresh")
     if (access != null) {
        console.log("logout")
        await getAPI.post('/logout/',{refresh: refresh}, { headers: { Authorization: `Bearer ${access}` }}  ) // addd refresh
        context.commit('DESTROY_TOKEN')
     }
   },
   userLogin (context, usercredentials) { //async await
     return new Promise((resolve, reject) => {
       getAPI.post('/login/', {
         username: usercredentials.username,
         password: usercredentials.password
       })
         .then(response => {
           context.commit('UPDATE_STORAGE', { access: response.data.access, refresh: response.data.refresh }) 
           resolve()
         })
         .catch(err => {
           reject(err)
         })
     })
   },
   userRegister (context, data) {
    return new Promise((resolve, reject) => {
      getAPI.post('/register/', {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        username: data.username,
        password: data.password,
        password2: data.password2
      })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
      })
    }
  }



 export default {
    state,
    actions,
    mutations
  };
