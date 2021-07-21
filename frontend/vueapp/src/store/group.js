import { getAPI } from '../api/axios-api'
import routes from '../router/routes'
import { NO_GROUP_FOUND, DEL_GROUP, NO_DEL }  from './const'

const state = {
    list_members: "",
    info_group: "",
    list_groups: "",
    message_group: ""
 }
const mutations = {
  GET_INITIAL_MEMBERS(state, members) {
    state.list_members = members
  },
  GET_INFO_GROUP(state, info) {
    state.info_group = info
  }, 
  GET_LIST_GROUPS(state, groups) {
    state.list_groups = groups
  },
  MESS_GROUP(state, message) {
    state.message_group = message
  }
}
const actions = {
  async getGroup(context, group) {
    // Get group by id
    const access = localStorage.getItem("access")
    try {
      let response = await getAPI.get(`/group/?id=${group.id}`, { headers: { Authorization: `Bearer ${access}` }}  );
      context.commit('GET_INFO_GROUP', response.data.results);
    } catch (e) {
      routes.push({ name: 'page-not-found' });
    }
  },
  async getAllGroups(context) {
    // Get all groups for admin user
    const is_staff = localStorage.getItem("is_staff")
    const access = localStorage.getItem("access")
    if (is_staff != "true") {
      routes.push({ name: 'page-not-found' });
    } else {
      try {
        let response = await getAPI.get(`/group/`, { headers: { Authorization: `Bearer ${access}` }}  );
        context.commit('GET_LIST_GROUPS', response.data.results);
      } catch (e) {
        context.commit('MESS_GROUP', NO_GROUP_FOUND);
      }
    }
  },
  async getMembersGroup(context, group) {
    // Get members group 
    const access = localStorage.getItem("access")
    try {
      let response = await getAPI.get(`/profile/?groups=${group.id}`, { headers: { Authorization: `Bearer ${access}` }}  );
      context.commit('GET_INITIAL_MEMBERS', response.data.results) 
    } catch (e) {
      context.commit('GET_INITIAL_MEMBERS', '')
  }
  },
  async quitGroup(context, user) {
    // Current user quit the group
    const access = localStorage.getItem("access")
    try {
      await getAPI.delete(`profile/delete_user_group/`,{data: {user: user.user, group: user.group},  headers: { Authorization: `Bearer ${access}` }},    );
      routes.push({ name: 'profile' , params: {id: user.user}});
    } catch (e) {
      routes.push({ name: 'profile' , params: {id: user.user}});
    }
  },
  async delGroup(context, group) {
    // Admin user delete group
    const access = localStorage.getItem("access")
    try {
      await getAPI.delete(`/group/${group.id}/`, {headers: { Authorization: `Bearer ${access}` }},    );
      context.commit("MESS_GROUP", DEL_GROUP);
    } catch (e) {
      context.commit("MESS_GROUP", NO_DEL);
    }
  },

  
}
   
const getters = {
  Group: state => {
    return state.group
  },
  Members: state => {
    return state.list_members
  },
  InfoGroup: state => {
    return state.info_group
  },
  AllGroups: state => {
    return state.list_groups
  },
  MessGroups: state => {
    return state.message_group
  },

}

 export default {
    state,
    actions,
    getters,
    mutations
  };
