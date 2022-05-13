import { Api } from '@/api/api'

class RoutinesApi {
  static getUrl (slug) {
    return `${Api.baseURL}/routines${slug ? `/${slug}` : ''}`
  }

  static async add (routine) {
    return await Api.post(RoutinesApi.getUrl(), routine)
  }

  static async get (routineID) {
    return await Api.get(RoutinesApi.getUrl(routineID))
  }

  static async modify (routine) {
    return await Api.put(RoutinesApi.getUrl(routine.id), routine.id) // Verdadero si lo modificó. Caso contrario, falso.
  }

  static async delete (routineID) {
    return await Api.delete(RoutinesApi.getUrl(routineID))
  }

  static async getAll () {
    return await Api.get(RoutinesApi.getUrl())
  }

  static async executeRoutine (routineID) {
    return await Api.put(RoutinesApi.getUrl(`${routineID}/execute`))
  }
}

class Routine {
  constructor (id, name, meta) {
    if (id) {
      this.id = id
    }
    this.name = name
    this.meta = meta
  }

  toString () {
    return JSON.stringify(this, null, 2)
  }
}

export { RoutinesApi, Routine }
