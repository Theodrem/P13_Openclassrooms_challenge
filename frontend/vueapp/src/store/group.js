import { getAPI } from '../api/axios-api'
import routes from '../router/routes'


const state = {
    list_members: "",
    info_group: ""
 }
const mutations = {
  ADD_NEW_MEMBER(state, member) {
    state.list_members.push(member)
  },
  GET_INITIAL_MEMBERS(state, members) {
    state.list_members = members
  },
  GET_INFO_GROUP(state, info) {
    state.info_group = info
  }

  
}
const actions = {
  async getGroup(context, group) {
    const access = localStorage.getItem("access")
    try {
      let response = await getAPI.get(`/group/?id=${group.id}`, { headers: { Authorization: `Bearer ${access}` }}  );
      context.commit('GET_INFO_GROUP', response.data.results);
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
      context.commit('GET_INITIAL_MEMBERS', '')
  }
  },
  async addMember(context, user) {
    const access = localStorage.getItem("access")
    console.log(user)
    try {
      let response = await getAPI.post(`profile/add_user_group/`,{user: user.user, group: user.group}, { headers: { Authorization: `Bearer ${access}` }}  ) 
      context.commit('ADD_NEW_MEMBER', response.data)
      console.log(response.data)
    } catch (e) {
      console.log("zzzzeee")
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
