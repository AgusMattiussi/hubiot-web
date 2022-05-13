import { DevicesApi } from '@/api/devicesApi'

export default {
  namespaced: true,
  state: {
    items: []
  },
  getters: {
  },
  actions: {
    async create (context, device) {
      const result = await DevicesApi.create(device)
      await context.dispatch('getAll')
      return result
    },
    async modify (context, device) {
      const result = await DevicesApi.modify(device)
      await context.dispatch('getAll')
      return result
    },
    async delete (context, deviceID) {
      const result = await DevicesApi.delete(deviceID)
      await context.dispatch('getAll')
      return result
    },
    async get (context, deviceID) {
      return await DevicesApi.get(deviceID)
    },
    async fetchDevices (context) {
      const result = await DevicesApi.getAll()
      context.commit('setDevices', result)
      return result
    }
  },
  mutations: {
    setDevices (state, devices) {
      state.items = devices
    }
  }
}
