import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Home from '../views/Home.vue'
const Login = () => import('../views/login/index.vue')
const Ind = () => import('../views/ind.vue')
const userList = () => import('../views/userlist')
const roleList = () => import('../views/rolelist')
const rightList = () => import('../views/rightlist')
const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    redirectL:'/login'
  },
  {
    path: '/ind',
    name: 'Ind',
    component: Ind
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      Authorition: true
    },
    children: [
      {
        path: '/userlist',
        name: 'userlist',
        component: userList
      },
      {
        path: '/rolelist',
        name: 'roleList',
        component: roleList
      },
      {
        path: '/rightlist',
        name: 'rightList',
        component: rightList
      }
    ],
    redirect: '/userlist'
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
