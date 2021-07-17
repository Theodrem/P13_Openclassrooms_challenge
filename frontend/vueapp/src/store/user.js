import { getAPI } from '../api/axios-api'
import routes from '../router/routes'
import { 
  NO_USER_FOUND, 
  PASSWORD_NOT_MATCH,
  INCORRECT_EMAIL,
  PASSWORD_NOT_SECUR,
  CHANGED_PASSWORD,
  EMAIL_SENT
 }  from './const'


const state = {
    list_users: "",
    message_email: "",
    message_reset: "",
    mess_no_user: ""
 }

const mutations = {
  SEND_EMAIL(state, email) {
    state.message_email = email;
  },
  MESSAGE_RESET(state, password) {
    state.message_reset = password;
  },
  GET_LIST_USER(state, user) {
    state.list_users = user;
  },
  DEL_LIST_USER(state) {
    state.list_users = "";
  },
  MESS_USER_NO_FOUND(state, message) {
    state.mess_no_user = message;
  },
}
 
const actions = {
  async getListUsers(context, user) {
    try {
      const access = localStorage.getItem("access");
      let response = await getAPI.get(`/profile/?username=${user.username}`, { headers: { Authorization: `Bearer ${access}` }});
      context.commit("GET_LIST_USER", response.data.results);
      if (state.list_users.length > 0) {
        context.commit("MESS_USER_NO_FOUND", "");
      } else {
        context.commit("MESS_USER_NO_FOUND", NO_USER_FOUND);
      }
    } catch(e) {
      context.commit("DEL_LIST_USER", NO_USER_FOUND);
    }
  },
  async delListUsers(context) {
    context.commit("DEL_LIST_USER", NO_USER_FOUND);
  },
  async postEmailReset(context, user) {
    try {
      await getAPI.post(`/api/password_reset/`, {email: user.email});
      await context.commit("SEND_EMAIL", EMAIL_SENT);
    } catch(e) {
      context.commit("SEND_EMAIL", INCORRECT_EMAIL)
    } 
  },
  async resetPasswordConfirm(context, user) {
    try {
      if (user.password1 == user.password2 ){
        await getAPI.post(`/api/password_reset/confirm/`, {password: user.password1, token: user.token});
        await context.commit("MESSAGE_RESET", CHANGED_PASSWORD);
        routes.push({ name: 'login' });
      }
      else {
        context.commit("MESSAGE_RESET", PASSWORD_NOT_MATCH)
      }
      } catch(e) {
          context.commit("MESSAGE_RESET", PASSWORD_NOT_SECUR);
    }
  }
}
   
const getters = {
  ListUsers: state => {
    return state.list_users
  },
  MessageSend: state => {
    return state.message_email
  },
  MessageReset: state => {
    return state.message_reset
  },
  MessageNoUser: state => {
    return state.mess_no_user
  },
  
}

 export default {
    state,
    actions,
    getters,
    mutations
  };