import Vue from 'vue'
import Vuex from 'vuex'
import devices from '@/store/modules/devices'
import deviceTypes from '@/store/modules/deviceTypes'
import routines from '@/store/modules/routines'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    devices,
    deviceTypes,
    routines
  }
})
