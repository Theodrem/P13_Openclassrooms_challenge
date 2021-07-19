import { getAPI } from '../api/axios-api'
import routes from '../router/routes'

const state = {
    list_group_posts: [],
 }
const mutations = {
  ADD_NEW_POST(state, post) {
    state.list_group_posts.push(post)
  },
  GET_LIST_POSTS(state, posts) {
    state.list_group_posts = posts
  }

}
const actions = {
  async getListPost(context, group) {
    const access = localStorage.getItem("access")
    try {
      let response = await getAPI.get(`/post/?group=${group.group}`, { headers: { Authorization: `Bearer ${access}` }}  );
      context.commit('GET_LIST_POSTS', response.data.results);
    } catch (e) {
        routes.push({ name: 'page-not-found' });
  }
},
  async addPost(context, post) {
      const access = localStorage.getItem("access")
      try {
        let response = await getAPI.post(`/post/`, {text: post.text, author: post.user, group: post.group}, { headers: { Authorization: `Bearer ${access}` }}  );
        context.commit('ADD_NEW_POST', response.data.results);
      } catch (e) {
          routes.push({ name: 'page-not-found' });
    }
  },
  async delPost(context, post) {
    const access = localStorage.getItem("access")
    try {
      await getAPI.delete(`/post/${post.id}/`, { headers: { Authorization: `Bearer ${access}` }}  );
    } catch (e) {
        routes.push({ name: 'page-not-found' });
      }
  },
}
   
const getters = {
  ListPostsGroup: state => {
    return state.list_group_posts
  }
}

 export default {
    state,
    actions,
    getters,
    mutations
  };
