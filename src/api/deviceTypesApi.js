import { Api } from '@/api/api'

class DeviceTypesApi {
  static getUrl (slug) {
    // console.log(`${Api.baseURL}/devices${slug ? `/${slug}` : ''}`)
    return `${Api.baseURL}/devicetypes${slug ? `/${slug}` : ''}`
  }

  static async get (deviceTypeId) {
    return await Api.get(DeviceTypesApi.getUrl(deviceTypeId))
  }

  static async getAll () {
    // console.log(DeviceTypesApi.getUrl())
    return await Api.get(DeviceTypesApi.getUrl())
  }
}

class DeviceType {
  toString () {
    return JSON.stringify(this, null, 2)
  }
}

export { DeviceTypesApi, DeviceType }
