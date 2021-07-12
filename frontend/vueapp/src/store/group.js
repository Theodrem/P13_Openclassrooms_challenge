import { getAPI } from '../api/axios-api'
import routes from '../router/routes';

const state = {
    group: null,
    list_members: [],
 }
const mutations = {
  ADD_NEW_MEMBER(state, member) {
    state.list_members.push(member)
  },
  GET_INITIAL_MEMBERS(state, members) {
    state.list_members = (members)
  },
  GET_INFO_GROUP(state, group) {
    state.group = (group)
  }
}
const actions = {
  async getGroup(context, id) {
    const access = localStorage.getItem("access")
    try {
      let response = await getAPI.get(`/group/${id.id}`, { headers: { Authorization: `Bearer ${access}` }}  )
      context.commit('GET_INFO_GROUP', response.data)
    } catch (e) {
      routes.push({ name: 'page-not-found' });
  }
},
  async getMembersGroup(context, group) {
    const access = localStorage.getItem("access")
    try {
      let response = await getAPI.get(`/profile/?groups=${group.id}`, { headers: { Authorization: `Bearer ${access}` }}  )
      context.commit('GET_INITIAL_MEMBERS', response.data.results) 
    } catch (e) {
      context.commit('GET_INITIAL_MEMBERS', null)
  }
  },
  async addMember(context, user) {
    const access = localStorage.getItem("access")
    try {
      let response = await getAPI.post(`profile/add_user_group/`,{user: user.user, group: user.group}, { headers: { Authorization: `Bearer ${access}` }}  ) 
      context.commit('ADD_NEW_MEMBER', response.data)
      return state.list_members
    } catch (e) {
      context.commit('ADD_NEW_MEMBER', null)
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
}

 export default {
    state,
    actions,
    getters,
    mutations
  };
