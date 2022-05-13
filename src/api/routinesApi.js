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
  constructor (name, actions, meta) {
    this.name = name
    this.actions = actions
    this.meta = meta
  }

  toString () {
    return JSON.stringify(this, null, 2)
  }
}

class Action {
  constructor (device, actionName, params, meta) {
    this.device = device
    this.actionName = actionName
    this.params = params
    this.meta = meta
  }
}

// {
//   "name": "good night",
//   "actions": [
//   {
//     "device": {
//       "id": "e27c57a632b9769e" -> particular
//     },
//     "actionName": "stop",
//     "params": [],
//     "meta": {}
//   },
//   {
//     "device": {
//       "id": "eb478da01168c7c4"
//     },
//     "actionName": "turnOff",
//     "params": [
//       "1234"
//     ],
//     "meta": {}
//   }
// ],
//   "meta": {}
// }

export { RoutinesApi, Routine, Action }
