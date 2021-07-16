import { getAPI } from '../api/axios-api'
import routes from '../router/routes'
import { MESSAGE_ADD_GROUP_FAIL }  from './const'
//les getters agissent en live pour changer en direct jouué avec les getters

//pas de valeur null initial
const state = {
    list_challenges: "",
    info_user: "",
    list_group: "",
    id_user_groups: "",
    list_validate_challenges: "",
    group_exist: ""
 }
 const mutations = {
  GET_INFO_USER(state, info) {
    state.info_user = info
  },
  GET_LIST_CHALLENGES(state, challenges) {
    state.list_challenges = challenges
  },
  GET_LIST_VALIDATE_CHALLENGES(state, challenges) {
    state.list_validate_challenges = challenges
  },
  MESSAGE_ADD_GROUP_FAIL(state, message) {
    state.group_exist = message; 
  }
}

const actions = {
  async getProfile(context, user) {
    const access = localStorage.getItem("access");
    try {
      let response = await getAPI.get(`/profile/?id=${user.id}`, { headers: { Authorization: `Bearer ${access}` }} ); 
      context.commit("GET_INFO_USER", response.data.results);
    } catch (e) {
      routes.push({ name: 'page-not-found' });
    }
  },

  async getUserChallenge(context, user) {
    const access = localStorage.getItem("access");
    try {
    let response = await getAPI.get(`users-challenges/?status=${user.status}&user_id=${user.id}`, { headers: { Authorization: `Bearer ${access}` }}  );
    if (user.status == "Validé") {
      context.commit("GET_LIST_VALIDATE_CHALLENGES", response.data.results);
    } else {
      context.commit("GET_LIST_CHALLENGES", response.data.results);
    }
    } catch (e) {
      context.commit("GET_LIST_CHALLENGES", null);
    }
  },
  async addGroup (context, group) {
      const access = localStorage.getItem("access")
      const user_id = localStorage.getItem("id")
      try {
        let response = await getAPI.post('/group/',{name: group.group}, { headers: { Authorization: `Bearer ${access}` }}  );
        await getAPI.post(`profile/add_user_group/`,{user: user_id, group: response.data.id}, { headers: { Authorization: `Bearer ${access}` }}  );
        context.commit("MESSAGE_ADD_GROUP_FAIL", "");
      } catch (e) {
        context.commit("MESSAGE_ADD_GROUP_FAIL", MESSAGE_ADD_GROUP_FAIL);
      }   
    }, 
    async update_challenge(context, user_challenge) {
      const access = localStorage.getItem("access");
      const user_id = localStorage.getItem("id");
      try {
        await getAPI.put(`/users-challenges/${user_challenge.user_challenge.id}/`, 
        {user: user_id, challenge: user_challenge.user_challenge.challenge_id, status: user_challenge.status}, { headers: { Authorization: `Bearer ${access}` }}  );
      } catch (e) {
        context.commit("UPDATE_CHALLENGE", null);
      } 
    },   
}
   
const getters = {
  InfosUser: state => {
    return state.info_user
  },
  ChallengeUser: state => {
    return state.list_challenges
  },
  ValidateChallengeUser: state => {  //modifier avec le getter une seul action
    return state.list_validate_challenges
  },
  Groups: state => {
    return state.list_group
  },
  MessageAddGroup: state => {
    return state.group_exist
  },
  
  
}

 export default {
    state,
    actions,
    getters,
    mutations
  };