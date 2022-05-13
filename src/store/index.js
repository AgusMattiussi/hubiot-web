import Vue from 'vue'
import Vuex from 'vuex'
import devices from '@/store/modules/devices'
import routines from '@/store/modules/routines'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    devices,
    routines
  }
})
