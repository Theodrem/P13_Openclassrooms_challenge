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
    const user_id = localStorage.getItem("id")
    try {
      await getAPI.post('/users-challenges/',{user: user_id, challenge: challenge.id, status: "En cours"}, { headers: { Authorization: `Bearer ${access}` }}  ) // add refresh
    } catch (e) {
      console.log("L'objet existe déja")
    }   
  },
    async update_challenge(context, user_challenge) {
      const access = localStorage.getItem("access")
      const user_id = localStorage.getItem("id")
      console.log(user_challenge.state)
      try {
        await getAPI.put(`/users-challenges/${user_challenge.user_challenge.id}/`,
        {user: user_id, challenge: user_challenge.user_challenge.challenge_id, status: user_challenge.state},
        { headers: { Authorization: `Bearer ${access}` }}  ) // add refresh
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
