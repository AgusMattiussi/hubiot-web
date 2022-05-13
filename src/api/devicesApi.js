import Api from '@/api/api'

class DevicesApi {
  static getUrl (slug) {
    console.log(`${Api.baseURL}/devices${slug ? `/${slug}` : ''}`)
    return `${Api.baseURL}/devices${slug ? `/${slug}` : ''}`
  }

  static async create (device) {
    return await Api.post(DevicesApi.getUrl(), device)
  }

  static async get (deviceID) {
    return await Api.get(DevicesApi.getUrl(deviceID))
  }

  static async modify (device) {
    return await Api.put(DevicesApi.getUrl(device.id), device) // Verdadero si lo modificó. Caso contrario, falso.
  }

  static async delete (deviceID) {
    return await Api.delete(DevicesApi.getUrl(deviceID))
  }

  static async getAll () {
    console.log(DevicesApi.getUrl())
    return await Api.get(DevicesApi.getUrl())
  }

  static async getState (deviceID) {
    return await Api.get(DevicesApi.getUrl(`${deviceID}/state`))
  }

  static async getType (deviceID) {
    return await Api.get(DevicesApi.getUrl(`devicetypes/${deviceID}`))
  }

  static async modifyAction (deviceID, action) {
    return await Api.put(DevicesApi.getUrl(`${deviceID}/${action.name}`), action)
  }
}

export { DevicesApi }
