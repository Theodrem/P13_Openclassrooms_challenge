import { getAPI } from '../api/axios-api'
import routes from '../router/routes'
import { 
  NO_USER_FOUND, 
  PASSWORD_NOT_MATCH,
  INCORRECT_EMAIL,
  PASSWORD_NOT_SECUR,
  CHANGED_PASSWORD,
  EMAIL_SENT,
  DEL_USER,
  NO_DEL
 }  from './const'


const state = {
    list_users: "",
    message_email: "",
    message_reset: "",
    mess_user: "",
    all_users: ""
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
  GET_ALL_USER(state, user) {
    state.all_users = user;
  },
  DEL_LIST_USER(state) {
    state.list_users = "";
  },
  MESS_USER(state, message) {
    state.mess_user = message;
  },
}
 
const actions = {
  async getListUsers(context, user) {
    try {
      const access = localStorage.getItem("access");
      let response = await getAPI.get(`/profile/?username=${user.username}`, { headers: { Authorization: `Bearer ${access}` }});
      context.commit("GET_LIST_USER", response.data.results);
      if (state.list_users.length > 0) {
        context.commit("MESS_USER", "");
      } else {
        context.commit("MESS_USER", NO_USER_FOUND);
      }
    } catch(e) {
      context.commit("DEL_LIST_USER", NO_USER_FOUND);
    }
  },
  async getAllUsers(context) {
    const is_staff = localStorage.getItem("is_staff");
    if (is_staff != "true") {
      routes.push({ name: 'page-not-found' });
    } else {
      try {
        const access = localStorage.getItem("access");
        let response = await getAPI.get(`/profile/`, { headers: { Authorization: `Bearer ${access}` }});
        context.commit("GET_ALL_USER", response.data.results);
      } catch(e) {
        routes.push({ name: 'page-not-found' });
      }
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
  },
  async delUser(context, user) {
    const access = localStorage.getItem("access")
    try {
        await getAPI.delete(`/profile/${user.id}/`, { headers: { Authorization: `Bearer ${access}` }}  );
        await context.commit("MESS_USER", DEL_USER);
      } catch(e) {
        await context.commit("MESS_USER", NO_DEL);
        console.log(state.mess_user)
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
  MessageUser: state => {
    return state.mess_user
  },
  AllUsers: state => {
    return state.all_users
  },
  
}

 export default {
    state,
    actions,
    getters,
    mutations
  };