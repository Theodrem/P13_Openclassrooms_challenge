import { getAPI } from '../api/axios-api'

const state = {
    list_challenges: [],
    challenge_id: "ss"
 }

const actions = {
   get_challenges () {
      const token = localStorage.getItem("access")
      getAPI.get('/challenges/',  { headers: { Authorization: `Bearer ${token}` } })
          .then((response) => {
            state.list_challenges = response.data
          })
          .catch(err => {
            console.log(err)
          })
   
        },
  async addChallenge (context, challenge) {
    const access = localStorage.getItem("access")
    try {
      await getAPI.post('/add_challenges/',{challenge: challenge.id, status: "En cours"}, { headers: { Authorization: `Bearer ${access}` }}  ) // add refresh
    } catch (e) {
      console.log("L'objet existe déja")
    }   
  }
  
}
   
const getters = {
  challenges: state => {
    return state.list_challenges
  }
}

 export default {
    state,
    actions,
    getters
  };
