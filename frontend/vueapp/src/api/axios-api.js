import axios from 'axios'


const getAPI = axios.create({
    baseURL: 'http://159.65.56.183/api',
})

export { getAPI }
