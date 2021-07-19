import { getAPI } from '../api/axios-api'
import routes from '../router/routes'
import { 
  MESSAGE_ADD_CHALLENGE_FAIL,
  DEL_CHALL,
  NO_DEL,
  MESSAGE_ADD_CHALLENGE
 }  from './const'


const state = {
    list_challenges: '',
    message_challenge: '',
    message_add_challenge: ''
 }

 const mutations = {
   GET_LIST_CHALLENGES(state, challenges) {
    state.list_challenges = challenges
  },
  UPDATE_MESS_CHALLENGE(state, message) {
    state.message_challenge = message;
  },
  UPDATE_ADD_MESS_CHALLENGE(state, message) {
    state.message_add_challenge = message;
  },
}
const actions = {
   async get_challenges (context) {
     try {
      const token = localStorage.getItem("access");
      let response = await getAPI.get('/challenges/',  { headers: { Authorization: `Bearer ${token}` } })
      context.commit("GET_LIST_CHALLENGES", response.data);
     } catch(e) {
       routes.push({ name: 'page-not-found' });
     }
        },
  async addUserChallenge (context, challenge) {
    const access = localStorage.getItem("access");
    const user_id = localStorage.getItem("id");
    try {
      await getAPI.post('/users-challenges/',{user: user_id, challenge: challenge.id, status: "En cours"}, { headers: { Authorization: `Bearer ${access}` }}  );
      routes.push({ name: 'profile', params: {id: user_id}});
    } catch (e) {
      context.commit("UPDATE_MESS_CHALLENGE", MESSAGE_ADD_CHALLENGE_FAIL);
    }   
  },
  async delChallenge (context, challenge) {
    const access = localStorage.getItem("access");
    try {
      await getAPI.delete(`/challenges/${challenge.id}/`,{ headers: { Authorization: `Bearer ${access}` }}  );
      context.commit("UPDATE_MESS_CHALLENGE", DEL_CHALL);
    } catch (e) {
      context.commit("UPDATE_MESS_CHALLENGE", NO_DEL);

    }   
  },
  async addChallenge (context, challenge) {
    const access = localStorage.getItem("access");
    console.log(challenge)
    try {
      await getAPI.post('/challenges/',{category: challenge.category, title: challenge.title, icon: challenge.icon, difficult: challenge.difficult},
       { headers: { Authorization: `Bearer ${access}` }}  );
      context.commit("UPDATE_ADD_MESS_CHALLENGE", MESSAGE_ADD_CHALLENGE);
    } catch (e) {
      context.commit("UPDATE_MESS_CHALLENGE", MESSAGE_ADD_CHALLENGE_FAIL);

    }   
  },
}
   
const getters = {
  challenges: state => {
    return state.list_challenges
  },
  MessageChallenge: state => {
    return state.message_challenge
  },
  MessageAddChallenge: state => {
    return state.message_add_challenge
  },
}

 export default {
    state,
    actions,
    getters,
    mutations
  };
