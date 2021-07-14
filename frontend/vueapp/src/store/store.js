import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import challenge from './challenge'
import profile from './profile'
import group from './group'
import user from './user'
import post from './post'
import notification from './notification'


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    challenge,
    profile,
    group,
    user,
    post,
    notification
  },
})