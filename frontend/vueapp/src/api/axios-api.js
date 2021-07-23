import axios from 'axios'


const getAPI = axios.create({
    baseURL: "",
})

export { getAPI }