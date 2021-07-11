import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index'
import Login from '../views/Login'
import Logout from '../views/Logout'
import Register from '../views/Register'
import Profile from '../views/Profile'
import Challenge from '../views/Challenge'
import Actuality from '../views/Actuality'
import Group from '../views/Group'
import ResetPassword from '../views/ResetPassword'
import ResetPasswordConfirm from '../views/ResetPasswordConfirm'


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
            path: '/profile/:id',  
            name: 'profile', 
            component: Profile,
        },
        {
            path: '/challenge',
            name: 'challenge',
            component: Challenge
        },
        {
            path: '/actuality',
            name: 'actuality',
            component: Actuality
        },
        {
        path: '/group/:id',
        name: 'group',
        component: Group
        },
        {
        path: '/reset-password/',
        name: 'reset-password',
        component: ResetPassword
        },
        {
        path: '/reset-password-confirm/:token',
        name: 'reset-password-confirm',
        component: ResetPasswordConfirm
        },
        



    ]
})