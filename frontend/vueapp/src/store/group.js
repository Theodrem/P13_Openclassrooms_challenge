import { getAPI } from '../api/axios-api'

const state = {
    list_group: [],
    group: null,
    list_members: []
 }
//add mutation
const actions = {
    async addGroup (context, group) {
    const access = localStorage.getItem("access")
    const user_id = localStorage.getItem("id")
    localStorage.setItem("group", group.group)
    try {
      await getAPI.post('/group/',{name: group.group}, { headers: { Authorization: `Bearer ${access}` }}  )//faire function
      await getAPI.post(`/profile/add_user_group/`,
      {user: user_id, name: group.group},
      { headers: { Authorization: `Bearer ${access}` }}  )
    } catch (e) {
      console.log("L'objet existe déja")
    }   
  },
  async getGroups() {
    const access = localStorage.getItem("access")
    try {
      let response = await getAPI.get(`/group/`, { headers: { Authorization: `Bearer ${access}` }}  )
      state.list_group = response.data
    } catch (e) {
      console.log("L'objet existe déja")
  }
},  
  async getGroup(context, id) {
    const access = localStorage.getItem("access")
    try {
      let response = await getAPI.get(`/group/${id.id}`, { headers: { Authorization: `Bearer ${access}` }}  )
      state.group = response.data
    } catch (e) {
      console.log("L'objet existe déja")
  }
},
  async getMembersGroup(context, group) {
    const access = localStorage.getItem("access")
    let response = await getAPI.get(`/profile/?groups=${group.id}`, { headers: { Authorization: `Bearer ${access}` }}  ) 
    state.list_members = response.data.results
    //localStorage.setItem("user_search", response.data.id)
  },

  async addMember(context, user) {
    const access = localStorage.getItem("access")
    console.log(user.user, user.group)
    let response = await getAPI.post(`profile/add_user_group/`,{user: user.user, group: user.group}, { headers: { Authorization: `Bearer ${access}` }}  ) 
    return response.data
    //localStorage.setItem("user_search", response.data.id)
  },
  
}
   
const getters = {
  Groups: state => {
    return state.list_group
  },
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
    getters
  };
