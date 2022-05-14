import { DeviceTypesApi, DeviceType } from '@/api/deviceTypesApi'

export default {
  namespaced: true,
  state: {
    deviceTypes: []
  },
  getters: {
    getTypeForDeviceID: (state) => (id) => {
      console.log(state.deviceTypes.find(deviceType => deviceType.id === id))
      return state.deviceTypes.find(deviceType => deviceType.id === id)
    }
  },
  actions: {
    async get (context, deviceTypeId) {
      const result = await DeviceTypesApi.get(deviceTypeId)
      await context.dispatch('getAll')
      return Object.assign(new DeviceType(), result)
    },
    async getAll (context) {
      let result = await DeviceTypesApi.getAll()
      result = result.map((deviceType) => Object.assign(new DeviceType(), deviceType))
      context.commit('setDeviceTypes', result)
    }
  },
  mutations: {
    setDeviceTypes (state, deviceTypes) {
      state.deviceTypes = deviceTypes
    }
  }
}
