import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";


// Load Vuex
Vue.use(Vuex);
// Create store
export default new Vuex.Store({
  plugins: [createPersistedState()],

  state: {
      current: 0,
      ideas: {},
  },

  mutations: {
      INCREMENT_COUNTER(state) {
          state.current += 1;
          
      },
      DECREMENT_COUNTER(state) {
        state.current -= 1;
      },
      CREATE_IDEAS(state, payload) {
        const id = Date.now()
        state.ideas[id] = payload;
        state.ideas = { ...state.ideas };
      },
  },

  getters: {
   allIdeas(state) {
     const allIdeas = Object.keys(state.ideas).map(key => state.ideas[key]);
     console.log(allIdeas)
     return allIdeas
    },
  },

  actions: {
    createIdea(context, payload) {
      console.log("create idea action");
      context.commit("CREATE_IDEAS", payload);
    }
  }
})