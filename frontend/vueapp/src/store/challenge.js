import { getAPI } from '../api/axios-api'
import routes from '../router/routes'

const state = {
    list_challenges: '',
 }

 const mutations = {
   GET_LIST_CHALLENGES(state, challenges) {
    state.list_challenges = challenges
  },
}
const actions = {
  // Get all challenges for challenge and admin page
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
    //  the current user adds a challenge to their account
    const access = localStorage.getItem("access");
    const user_id = localStorage.getItem("id");
    try {
      await getAPI.post('/users-challenges/',{user: user_id, challenge: challenge.id, status: "En cours"}, { headers: { Authorization: `Bearer ${access}` }}  );
      routes.push({ name: 'profile', params: {id: user_id}});
    } catch (e) {
      routes.push({ name: 'profile', params: {id: user_id}});
    }   
  },
  async delChallenge (context, challenge) {
     //  the admin user delete one challenge
    const access = localStorage.getItem("access");
    try {
      await getAPI.delete(`/challenges/${challenge.id}/`,{ headers: { Authorization: `Bearer ${access}` }}  );
    } catch (e) {
      routes.push({ name: 'page-not-found' });

    }   
  },
  async addChallenge (context, challenge) {
    //  the admin user add one challenge
    const access = localStorage.getItem("access");
    try {
      await getAPI.post('/challenges/',{category: challenge.category, title: challenge.title, icon: challenge.icon, difficult: challenge.difficult},
       { headers: { Authorization: `Bearer ${access}` }}  );
    } catch (e) {
      routes.push({ name: 'page-not-found' });

    } 
  },
}
   
const getters = {
  challenges: state => {
    return state.list_challenges
  },
}

 export default {
    state,
    actions,
    getters,
    mutations
  };
