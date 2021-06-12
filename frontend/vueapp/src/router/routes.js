import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index'
import Login from '../views/Login'
import Logout from '../views/Logout'
import Register from '../views/Register'
import Actuallity from '../views/Actuallity'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes : [ 
        {
            path: '/',
            name: 'index', 
            component: Index,
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
        {
            path: '/register',
            name: 'register', 
            component: Register,
        },
        {
            path: '/actuallity',
            name: 'actuallity', 
            component: Actuallity,
        }
    ]
})