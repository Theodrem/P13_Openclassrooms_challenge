import Vue from 'vue'
import VueRouter from 'vue-router'
import Challenge from './views/Challenge'
import Logout from './views/Logout'
import Login from './views/Login';

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes : [ 
        {
            path: '/',
            name: 'challenge', 
            component: Challenge,
        },
        {
            path: '/login',
            name: 'login', 
            component: Login,
        },
        {
            path: '/logout',
            name: 'logout', 
            component: Logout,
        },
    ]
})