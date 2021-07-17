import { getAPI } from '../api/axios-api'
import routes from '../router/routes'
  
const state = {
    list_invitations_user: [],
    message_invitation: "",
   }
const mutations = {
  GET_LIST_INVITATIONS(state, invitations) {
    state.list_invitations_user = invitations
  },
}
const actions = {
  async getListInvitations(context) {
    const access = localStorage.getItem("access")
    const user_id = localStorage.getItem("id")
    try {
      let response = await getAPI.get(`/notification/?ricipient=${user_id}`, { headers: { Authorization: `Bearer ${access}` }}  );
      context.commit('GET_LIST_INVITATIONS', response.data.results);
    } catch (e) {
        routes.push({ name: 'page-not-found' });
  }
},
async SendInvitation(context, invitation) {
    const access = localStorage.getItem("access")
    try {
      await getAPI.post(`/notification/`, {description: "Invitation sur le groupe", ricipient: invitation.user, group: invitation.group}, { headers: { Authorization: `Bearer ${access}` }}  );
    } catch (e) {
        routes.push({ name: 'page-not-found' });
  }
},
async dropInvitation(context, invit) {
    const access = localStorage.getItem("access")
    console.log(invit)
    try {
      await getAPI.delete(`/notification/${invit.id}/`, { headers: { Authorization: `Bearer ${access}` }}  );
    } catch (e) {
        routes.push({ name: 'page-not-found' });
  }
},
async acceptInvitation(context, user) {
  const access = localStorage.getItem("access")
  console.log(user)
  try {
    await getAPI.post(`profile/add_user_group/`,{user: user.user, group: user.group}, { headers: { Authorization: `Bearer ${access}` }}  ) 
    routes.push({ name: 'group', params: {id: user.group }});
  } catch (e) {
    context.commit('ADD_MESSAGE_INVIT', "")
  }
},

}
   
const getters = {
  ListInviatitions: state => {
    return state.list_invitations_user
  },
  MessageInvitation: state => {
    return state.message_invitation
  },
}

 export default {
    state,
    actions,
    getters,
    mutations
  };
