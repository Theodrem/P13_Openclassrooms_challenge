import { getAPI } from '../api/axios-api'
import routes from '../router/routes';

const state = {
    list_challenges: [],
    info_user: [],
    list_group: [],
    id_user_groups: [],
    info_group: null,
    list_validate_challenges: []
 }
 const mutations = {
  GET_USER_GROUPS(state, groups) {
    groups.forEach(function (item) {
       state.list_group.push(item); 
      
    });
  },
  GET_ID_USER_GROUPS(state, groups) {
    state.id_user_groups = groups;
  },
  GET_INFO_USER(state, info) {
    state.info_user = info
  },
  GET_LIST_CHALLENGES(state, challenges) {
    state.list_challenges = challenges
  },
  GET_LIST_VALIDATE_CHALLENGES(state, challenges) {
    state.list_validate_challenges = challenges
  },
  ADD_GROUP(state, group) {
    state.list_group.push(group)
    state.info_group = group
  },

}

const actions = {
  async getProfile(context, user) {
    const access = localStorage.getItem("access");
    try {
    let response = await getAPI.get(`/profile/${user.id}/`, { headers: { Authorization: `Bearer ${access}` }}  ) 
    context.commit("GET_INFO_USER", response.data);
    context.commit("GET_ID_USER_GROUPS", response.data.groups);
    } catch (e) {
    routes.push({ name: 'page-not-found' });
    }
  },

  async getUserChallenge(context, user) {
    const access = localStorage.getItem("access");
    try {
    let response = await getAPI.get(`users-challenges/?status=En cours&user_id=${user.id}`, { headers: { Authorization: `Bearer ${access}` }}  );
    context.commit("GET_LIST_CHALLENGES", response.data.results);
    } catch (e) {
      context.commit("GET_LIST_CHALLENGES", null);
    }
  },

  async getUserValidateChallenge(context, user) {
    const access = localStorage.getItem("access");
    try {
    let response = await getAPI.get(`users-challenges/?status=Validé&user_id=${user.id}`, { headers: { Authorization: `Bearer ${access}` }}  );
    context.commit("GET_LIST_VALIDATE_CHALLENGES", response.data.results);
    } catch (e) {
      context.commit("GET_LIST_VALIDATE_CHALLENGES", null);
    }
  },

  async getUserGroups(context) {
    const access = localStorage.getItem("access");
    try {
      let response = await getAPI.get(`/group/`, { headers: { Authorization: `Bearer ${access}` }}  );
      context.commit("GET_USER_GROUPS", response.data.results);
      console.log(state.list_group)
    } catch (e) {
      context.commit("GET_USER_GROUPS", null);
    }
  },
  async addGroup (context, group) {
      const access = localStorage.getItem("access")
      try {
        let response = await getAPI.post('/group/',{name: group.group}, { headers: { Authorization: `Bearer ${access}` }}  );
        context.commit("ADD_GROUP", response.data);
        return state.list_group
      } catch (e) {
        context.commit("ADD_GROUP", null);
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
  InfoGroup: state => {
    return state.info_group
  },
}

 export default {
    state,
    actions,
    getters,
    mutations
  };