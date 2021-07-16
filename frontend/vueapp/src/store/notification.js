import { getAPI } from '../api/axios-api'
import routes from '../router/routes'

const state = {
    list_invitations_user: []
 }
const mutations = {
  GET_LIST_INVITATIONS(state, invitations) {
    state.list_invitations_user = invitations
  }
}
const actions = {
  async getListInvitations(context) {
    const access = localStorage.getItem("access")
    const user_id = localStorage.getItem("id")
    try {
      let response = await getAPI.get(`http://127.0.0.1:8000/notification/?ricipient=${user_id}`, { headers: { Authorization: `Bearer ${access}` }}  );
      context.commit('GET_LIST_INVITATIONS', response.data.results[0]);
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
async DropInvitations(context, post) {
    const access = localStorage.getItem("access")
    try {
      let response = await getAPI.post(`/notification/$`, {text: post.text, author: post.user, group: post.group}, { headers: { Authorization: `Bearer ${access}` }}  );
      context.commit('ADD_NEW_POST', response.data.results);
    } catch (e) {
        routes.push({ name: 'page-not-found' });
  }
},
}
   
const getters = {
  ListInviatitons: state => {
    return state.list_invitations_user
  }
}

 export default {
    state,
    actions,
    getters,
    mutations
  };
