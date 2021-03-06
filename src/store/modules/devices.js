import { DevicesApi, Device } from '@/api/devicesApi'

export default {
  namespaced: true,
  state: {
    devices: []
  },
  actions: {
    async create (context, device) {
      const result = await DevicesApi.add(device)
      context.dispatch('getAll')
      return Object.assign(new Device(), result)
    },
    async modify (context, device) {
      const result = await DevicesApi.modify(device)
      context.dispatch('getAll')
      return result
    },
    async delete (context, deviceID) {
      const result = await DevicesApi.delete(deviceID)
      context.dispatch('getAll')
      return result
    },
    async get (context, deviceID) {
      const result = await DevicesApi.get(deviceID)
      context.dispatch('getAll')
      return Object.assign(new Device(), result)
    },
    async getAll (context) {
      let result = await DevicesApi.getAll()
      result = result.map((device) => Object.assign(new Device(), device))
      context.commit('setDevices', result)
    },
    async getState (context, deviceID) {
      const result = await DevicesApi.getState(deviceID)
      context.dispatch('getAll')
      return result
    },
    async execute (context, params) {
      const result = await DevicesApi.executeAction(params.deviceId, params.action)
      context.dispatch('getAll')
      return result
    }
  },
  mutations: {
    setDevices (state, devices) {
      state.devices = devices
    },
    updateName (state, device) {
      const deviceFounded = state.devices.find(internalDevice => device.id === internalDevice.id)
      deviceFounded.name = device.name
    }
  }
}
