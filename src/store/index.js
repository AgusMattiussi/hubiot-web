import Vue from 'vue'
import Vuex from 'vuex'
import devices from '@/store/modules/devices'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    devices
  }
})
