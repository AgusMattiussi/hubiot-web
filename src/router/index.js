import Vue from 'vue'
import VueRouter from 'vue-router'
import RegisterView from '@/views/RegisterView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'loadingPage',
    component: () => import('../views/LoadingPageView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
