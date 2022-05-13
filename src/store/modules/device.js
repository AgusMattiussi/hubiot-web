import { RoutinesApi } from '@/api/routinesApi'

export default {
  namespaced: true,
  state: {
    devices: []
  },
  actions: {
    async create (context, device) {
      const result = await RoutinesApi.create(device)
      context.dispatch('getAll')
      return result
    },
    async modify (context, device) {
      const result = await RoutinesApi.modify(device)
      context.dispatch('getAll')
      return result
    },
    async delete (context, deviceID) {
      const result = await RoutinesApi.delete(deviceID)
      context.dispatch('getAll')
      return result
    },
    async get (context, deviceID) {
      return await RoutinesApi.get(deviceID)
    },
    async getAll (context) {
      const result = await RoutinesApi.getAll()
      context.commit('update', result)
      return result
    }
  },
  mutations: {
    update (state, devices) {
      state.devices = devices
    }
  }
}
