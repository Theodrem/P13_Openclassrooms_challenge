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
    message_register: null,
    message_login: null,
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
   UPDATE_MESSAGE_REG(state, message) {
     state.message_register = message;
   },
   UPDATE_MESSAGE_LOG(state, message) {
    state.message_login = message;
  },
   UPDATE_ID_IS_ADMIN(state, id, admin) {
    state.current_user_id = id;
    state.is_admin = admin

  }
 }
const actions = {
   async userLogout (context) {
     // When user logout we destroy the tokens, id, is_admin value in localstorage
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
     // When user login we add the tokens, is_admin value in localstorage
     try {
      let response = await getAPI.post('/login/', {username: usercredentials.username, password: usercredentials.password});
      await context.commit('UPDATE_STORAGE', { access: response.data.access, refresh: response.data.refresh });
     } catch(e) {
       context.commit('UPDATE_MESSAGE_LOG', ERROR_LOGIN);
     }
  },
   async saveId (context, usercredentials) {
     //Save id of current user in local storage
    const access = localStorage.getItem("access");
      let response = await getAPI.get(`/profile/?username=${usercredentials.username}`, { headers: { Authorization: `Bearer ${access}` }}  );
      localStorage.setItem("is_staff", response.data.results[0].is_staff);
      localStorage.setItem("id", response.data.results[0].id);
      await context.commit("UPDATE_ID_IS_ADMIN", localStorage.getItem("id"), localStorage.getItem("is_staff"));
      routes.push({ name: 'profile', params: {id: state.current_user_id}});
  },
   async userRegister (context, data) {
     // Add new user with form register values
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
          // All errors messages
          if ('username' in e.response.data) {
            context.commit("UPDATE_MESSAGE_REG", USERNAME_ALREADY_EXIST);
          }
          else if ('email' in e.response.data) {
          
          if (e.response.data.email.includes("Enter a valid email address.")) {
            context.commit("UPDATE_MESSAGE_REG", INCORRECT_EMAIL);
          } else {
            context.commit("UPDATE_MESSAGE_REG", EMAIL_ALREADY_EXIST);
          }
          }
          else if ('password' in e.response.data) {
          context.commit("UPDATE_MESSAGE_REG", PASSWORD_NOT_SECUR);
        }
      }
        } else {
          context.commit("UPDATE_MESSAGE_REG", PASSWORD_NOT_MATCH)
      }
    }
   }
 const getters = {
  MessageReg: state => {
    return state.message_register
  },
  MessageLog: state => {
    return state.message_login
  },
 }



 export default {
    state,
    actions,
    mutations,
    getters
  };
