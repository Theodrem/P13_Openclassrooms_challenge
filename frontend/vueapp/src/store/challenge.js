import { getAPI } from '../api/axios-api'
import routes from '../router/routes'
import { 
  MESSAGE_ADD_CHALLENGE_FAIL
 }  from './const'


const state = {
    list_challenges: '',
    message_add_challenge_fail: ''
 }

 const mutations = {
   GET_LIST_CHALLENGES(state, challenges) {
    state.list_challenges = challenges
  },
  UPDATE_MESS_CHALLENGE(state, message) {
    state.message_add_challenge_fail = message;
  }
}
const actions = {
   async get_challenges (context) {
     try {
      const token = localStorage.getItem("access")
      let response = await getAPI.get('/challenges/',  { headers: { Authorization: `Bearer ${token}` } })
      context.commit("GET_LIST_CHALLENGES", response.data);
     } catch(e) {
       routes.push({ name: 'page-not-found' });
     }
        },
  async addChallenge (context, challenge) {
    const access = localStorage.getItem("access")
    const user_id = localStorage.getItem("id")
    try {
      await getAPI.post('/users-challenges/',{user: user_id, challenge: challenge.id, status: "En cours"}, { headers: { Authorization: `Bearer ${access}` }}  );
      routes.push({ name: 'profile', params: {id: user_id}});
    } catch (e) {
      context.commit("UPDATE_MESS_CHALLENGE", MESSAGE_ADD_CHALLENGE_FAIL);
      console.log(state.message_add_challenge_fail)
    }   
  },
}
   
const getters = {
  challenges: state => {
    return state.list_challenges
  },
  MessageChallengeFail: state => {
    return state.message_add_challenge_fail
  },
}

 export default {
    state,
    actions,
    getters,
    mutations
  };
