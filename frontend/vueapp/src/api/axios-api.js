import axios from 'axios'


const getAPI = axios.create({
    baseURL: '159.65.56.183',
})

export { getAPI }