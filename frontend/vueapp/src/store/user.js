import { getAPI } from '../api/axios-api'
import routes from '../router/routes';

const state = {
    list_users: [],
    message_email: null,
    message_reset: null
 }

const mutations = {
  SEND_EMAIL(state, email) {
    state.message_email = email;
  },
  MESSAGE_RESET(state, password) {
    state.message_reset = password;
  },
}
 
const actions = {
  async getListUsers(context, user) {
    try {
      const access = localStorage.getItem("access");
      let response = await getAPI.get(`/profile/?username=${user.username}`, { headers: { Authorization: `Bearer ${access}` }});
      state.list_users = response.data;
    } catch(e) {
      context.commit("SEND_EMAIL", "Votre email est incorrect")
    }
  },
  async postEmailReset(context, user) {
    try {
      await getAPI.post(`/api/password_reset/`, {email: user.email});
      await context.commit("SEND_EMAIL", "Un email vous à été envoyé");
    } catch(e) {
      context.commit("SEND_EMAIL", "Votre email est incorrect")
    }
      
  },
  async resetPasswordConfirm(context, user) {
    try {
      if (user.password1 == user.password2 ){
        await getAPI.post(`/api/password_reset/confirm/`, {password: user.password1, token: user.token});
        await context.commit("MESSAGE_RESET", "Votre mot de passe à été changé");
        routes.push({ name: 'login' });
      }
      else {
        context.commit("MESSAGE_RESET", "Vos mots de passes ne correspondent pas")
      }
      } catch(e) {
          context.commit("MESSAGE_RESET", "Votre mot de passe n'est pas assez sécurié");
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
}

 export default {
    state,
    actions,
    getters,
    mutations
  };