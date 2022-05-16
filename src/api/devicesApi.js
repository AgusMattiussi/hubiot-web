import { Api } from '@/api/api'

class DevicesApi {
  static getUrl (slug) {
    // console.log(`${Api.baseURL}/devices${slug ? `/${slug}` : ''}`)
    return `${Api.baseURL}/devices${slug ? `/${slug}` : ''}`
  }

  static async add (device) {
    return await Api.post(DevicesApi.getUrl(), device)
  }

  static async modify (device) {
    return await Api.put(DevicesApi.getUrl(device.id), device) // Verdadero si lo modificó. Caso contrario, falso.
  }

  static async delete (deviceID) {
    return await Api.delete(DevicesApi.getUrl(deviceID))
  }

  static async get (deviceID) {
    return await Api.get(DevicesApi.getUrl(deviceID))
  }

  static async getAll () {
    // console.log(DevicesApi.getUrl())
    return await Api.get(DevicesApi.getUrl())
  }

  static async getState (deviceID) {
    return await Api.get(DevicesApi.getUrl(`${deviceID}/state`))
  }

  // static async getType (deviceID) {
  //   return await Api.get(DevicesApi.getUrl(`devicetypes/${deviceID}`))
  // }

  static async executeAction (deviceID, action) {
    return await Api.put(DevicesApi.getUrl(`${deviceID}/${action.name}`), action.data)
  }
}

class Device {
  constructor (type, name, meta) {
    // if (id) {
    //   this.id = id
    // }
    this.type = type
    this.name = name
    this.meta = meta
  }

  toString () {
    return JSON.stringify(this, null, 2)
  }
}

class DeviceMeta {
  constructor (image) {
    this.image = image
  }
}

class Action {
  constructor (name, data) {
    this.name = name
    this.data = data
  }
}

export { DevicesApi, Device, DeviceMeta, Action }
