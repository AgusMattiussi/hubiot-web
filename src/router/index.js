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
    path: '/routines',
    name: 'routines',
    component: () => import('../views/MyRoutinesView.vue')
  },
  {
    path: '/routines/:id',
    name: 'routineDetails',
    component: () => import('../views/RoutineDetailView.vue')
  },
  {
    path: '/new_routine',
    name: 'addNewRoutine',
    component: () => import('../views/AddNewRoutineView.vue')
  },
  {
    path: '/devices',
    name: 'devices',
    component: () => import('../views/MyDevicesView.vue')
  },
  {
    path: '/new_device',
    name: 'addNewDevice',
    component: () => import('../views/AddNewDeviceView.vue')
  },
  {
    path: '/devices/:slug',
    name: 'deviceDetails',
    component: () => import('../views/DeviceView.vue')
  },
  {
    path: '/list',
    name: 'devicesList',
    component: () => import('../views/ListOfDevices.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/error404',
    alias: '*',
    name: 'notFound',
    component: () => import('../views/NotFoundView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
