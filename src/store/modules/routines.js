import { RoutinesApi, Routine } from '@/api/routinesApi'

export default {
  namespaced: true,
  state: {
    routines: []
  },
  // getters: {
  // },
  actions: {
    async create (context, routine) {
      const result = await RoutinesApi.add(routine)
      await context.dispatch('getAll')
      // return result
      return Object.assign(new Routine(), result)
    },
    async modify (context, routine) {
      const result = await RoutinesApi.modify(routine)
      context.dispatch('getAll')
      return result
    },
    async delete (context, routineID) {
      const result = await RoutinesApi.delete(routineID)
      context.dispatch('getAll')
      return result
    },
    async get (context, routineID) {
      const result = await RoutinesApi.get(routineID)
      context.dispatch('getAll')
      return Object.assign(new Routine(), result)
    },
    async getAll (context) {
      let result = await RoutinesApi.getAll()
      result = result.map((routine) => Object.assign(new Routine(), routine))
      context.commit('setRoutine', result)
    }
  },
  mutations: {
    setRoutine (state, routines) {
      state.routines = routines
    }
  }
}
