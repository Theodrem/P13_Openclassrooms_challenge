import { getAPI } from '../api/axios-api'
import routes from '../router/routes';

const state = {
    list_challenges: [],
    challenge: null
 }

 const mutations = {
   GET_LIST_CHALLENGES(state, challenges) {
    state.list_challenges = challenges
  },
  UPDATE_CHALLENGE(state, challenge) {
    state.challenge = challenge
  },

}
const actions = {
   async get_challenges (context) {
     try {
      const token = localStorage.getItem("access")
      let response = await getAPI.get('/challenges/',  { headers: { Authorization: `Bearer ${token}` } })
      context.commit("GET_LIST_CHALLENGES", response.data)
     } catch(e) {
       routes.push({ name: 'page-not-found' });
     }
        },
  async addChallenge (context, challenge) {
    const access = localStorage.getItem("access")
    const user_id = localStorage.getItem("id")
    try {
      let response = await getAPI.post('/users-challenges/',{user: user_id, challenge: challenge.id, status: "En cours"}, { headers: { Authorization: `Bearer ${access}` }}  );
      context.commit("UPDATE_CHALLENGE", response.data)
    } catch (e) {
      console.log("L'objet existe déja")
    }   
  },
  async update_challenge(context, user_challenge) {
    const access = localStorage.getItem("access");
    const user_id = localStorage.getItem("id");
    try {
      let response = await getAPI.put(`/users-challenges/${user_challenge.user_challenge.id}/`, 
      {user: user_id, challenge: user_challenge.user_challenge.challenge_id, status: user_challenge.state}, { headers: { Authorization: `Bearer ${access}` }}  );
      context.commit("UPDATE_CHALLENGE", response.data);
    } catch (e) {
      context.commit("UPDATE_CHALLENGE", null);
  } 
}
  
}
   
const getters = {
  challenges: state => {
    return state.list_challenges
  }
}

 export default {
    state,
    actions,
    getters,
    mutations
  };
