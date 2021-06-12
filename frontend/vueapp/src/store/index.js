const state = {
   token: null,
   cards: "eeee" 
}
const mutations = {
  CREATE_CHALLENGE(state) {
    state.cards = "salut"
    console.log(state.cards)
  }
}
const getters = {
  card (state) {
    return state.cards
  }
}
const actions = {
  display_challenge(context) {
      context.commit('CREATE_CHALLENGE')
      console.log(state.token)
    }
}

 export default { 
    state,
    getters,
    actions,
    mutations
  };

  
