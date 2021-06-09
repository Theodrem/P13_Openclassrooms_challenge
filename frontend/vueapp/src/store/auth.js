import { getAPI } from '../api/axios-api'

const state = {
    accessToken: null,
    refreshToken: null,
 }
const mutations = {
    UPDATE_STORAGE (state, { access, refresh}) {
     localStorage.setItem("token", access);
     localStorage.setItem("refresh", refresh);
     state.accessToken = localStorage.getItem("token");
     state.refreshToken = localStorage.getItem("refresh");
   },
    DESTROY_TOKEN (state) {
     state.accessToken = null
     state.refreshToken = null
     localStorage.removeItem("token");
     localStorage.removeItem("refresh");
   }
 }
const getters = {
   loggedIn (state) {
     return state.accessToken != null
   }
 }
const actions = {
   userLogout (context) {
     if (context.getters.loggedIn) {
         context.commit('DESTROY_TOKEN')
     }
   },
   userLogin (context, usercredentials) {
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
   }
 };

 export default {
    state,
    getters,
    actions,
    mutations
  };
