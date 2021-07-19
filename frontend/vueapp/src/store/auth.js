import { getAPI } from '../api/axios-api'
import routes from '../router/routes'
import { 
  PASSWORD_NOT_MATCH,
  ERROR_LOGIN,
  INCORRECT_EMAIL,
  USERNAME_ALREADY_EXIST,
  PASSWORD_NOT_SECUR,
  EMAIL_ALREADY_EXIST
 }  from './const'

const state = {
    accessToken: null,
    refreshToken: null,
    id: null,
    message: null,
    current_user_id: null,
    is_admin: null
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
     localStorage.removeItem("id");
     localStorage.removeItem("is_staff");
   },
   UPDATE_MESSAGE(state, message) {
     state.message = message;
   },
   UPDATE_ID_IS_ADMIN(state, id, admin) {
    state.current_user_id = id;
    state.is_admin = admin

  }
 }
const actions = {
   async userLogout (context) {
    try {
     const access = localStorage.getItem("access")
     const refresh = localStorage.getItem("refresh")
        await getAPI.post('/logout/',{refresh: refresh}, { headers: { Authorization: `Bearer ${access}` }}  );
        context.commit('DESTROY_TOKEN');
     } catch(e) {
      context.commit('DESTROY_TOKEN');
      routes.push({ name: 'login'});
    }
   },
   async userLogin (context, usercredentials) { 
     try {
      let response = await getAPI.post('/login/', {username: usercredentials.username, password: usercredentials.password});
      await context.commit('UPDATE_STORAGE', { access: response.data.access, refresh: response.data.refresh });
     } catch(e) {
       context.commit('UPDATE_MESSAGE', ERROR_LOGIN);
     }
  },
   async saveId (context, usercredentials) {
    const access = localStorage.getItem("access");
      let response = await getAPI.get(`/profile/?username=${usercredentials.username}`, { headers: { Authorization: `Bearer ${access}` }}  );
      localStorage.setItem("is_staff", response.data.results[0].is_staff);
      localStorage.setItem("id", response.data.results[0].id);
      await context.commit("UPDATE_ID_IS_ADMIN", localStorage.getItem("id"), localStorage.getItem("is_staff"));
      routes.push({ name: 'profile', params: {id: state.current_user_id}});
  },
   async userRegister (context, data) {
       if (data.password == data.password2) {
         try {
          await getAPI.post('/register/', {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          username: data.username,
          password: data.password,
          password2: data.password2
        })
        routes.push({ name: 'login'});
        } catch(e) {
          if ('username' in e.response.data) {
            context.commit("UPDATE_MESSAGE", USERNAME_ALREADY_EXIST);
          }
          else if ('email' in e.response.data) {
          
          if (e.response.data.email.includes("Enter a valid email address.")) {
            context.commit("UPDATE_MESSAGE", INCORRECT_EMAIL);
          } else {
            context.commit("UPDATE_MESSAGE", EMAIL_ALREADY_EXIST);
          }
          }
          else if ('password' in e.response.data) {
          context.commit("UPDATE_MESSAGE", PASSWORD_NOT_SECUR);
        }
      }
        } else {
          context.commit("UPDATE_MESSAGE", PASSWORD_NOT_MATCH)
          console.log(data.password, data.password2)
      }
    }
   }
 const getters = {
  Message: state => {
    return state.message
  },
 }



 export default {
    state,
    actions,
    mutations,
    getters
  };
