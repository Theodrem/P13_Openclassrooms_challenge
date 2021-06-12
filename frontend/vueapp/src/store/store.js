import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import index from './index'


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    index,
  },
})