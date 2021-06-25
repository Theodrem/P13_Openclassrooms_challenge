import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import get_challenge from './get_challenge'



Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    get_challenge,
  
  },
})