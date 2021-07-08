import { getAPI } from '../api/axios-api'

const state = {
    list_group: []
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
  async getUserGroups() {
    const access = localStorage.getItem("access")
    try {
      let response = await getAPI.get(`/group/`, { headers: { Authorization: `Bearer ${access}` }}  )
      state.list_group = response.data
    } catch (e) {
      console.log("L'objet existe déja")
  }  
},
  
}
   
const getters = {
  groups: state => {
    return state.list_group
  }
}

 export default {
    state,
    actions,
    getters
  };
