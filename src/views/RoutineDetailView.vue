<template>
  <v-container class="container" fluid>
    <v-main class="container2">
      <v-sheet class="container3" elevation="24">
        <v-container class="container4" fluid>
          <v-row class="heading">
            <v-col><h1>Acciones</h1></v-col>
          </v-row>
          <v-row v-for="action in routine.actions" :key="action.id">
            <v-col md="4"></v-col>
            <v-col md="4">
              <v-card class="card">
                <div class="routineActions">
                  <div>
                    <v-card-title class="deviceName">
                      {{ action.device.name }}
                    </v-card-title>
                    <v-card-subtitle class="actionName">
                      {{ translate(action.actionName) }}: {{action.params[0].toString()}}
                    </v-card-subtitle>
                  </div>
                <v-avatar class="img">
                  <v-img :src="require(`@/assets/${action.device.meta.image}`)"></v-img>
                </v-avatar>
              </div>
            </v-card>
            </v-col>
            <v-col md="4"></v-col>
          </v-row>
          <v-row>
            <v-col></v-col>
            <v-col>
              <v-btn class="btn" @click="execute">
                Ejecutar rutina
              </v-btn>
            </v-col>
            <v-col></v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </v-main>
  </v-container>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import translations from '@/store/translations'

export default {
  name: 'RoutineDetail.vue',
  components: {
  },
  data () {
    return {
      routine: {},
      routineID: this.$route.params.id
    }
  },
  computed: {
    ...mapState('routines', {
      routines: (state) => state.routines
    }),
    ...mapState('devices', {
      devices: (state) => state.devices
    })
  },
  methods: {
    async execute () {
      await this.$execute(this.routineID)
      this.$router.go(-1)
    },
    ...mapGetters('devices', {
      $getDevices: 'get'
    }),
    ...mapActions('routines', {
      $getRoutine: 'get',
      $getAllRoutines: 'getAll',
      $execute: 'executeRoutine'
    }),
    translate (actionName) {
      return translations[actionName]
    }
  },
  async created () {
    await this.$getAllRoutines()
    this.routine = await this.$getRoutine(this.routineID)
  }
}
</script>

<style scoped>
.container{
  height: 100%;
}
.container2{
  height: 100%;
  margin-right: 2px;
  margin-left: 2px;
}
.container3{
  height: 100%;
  padding: 0;
}
.container4{
  height: 100%;
  background-color: #C5CAE9;
}
.heading{
  margin: 0;
}
.routineActions {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
}
.card{
  background-color: #8C9EFF;
}
.deviceName{
  font-size: 25px;
  font-weight: bold;
}
.actionName{
  text-align: left;
}
.img{
  width: 150px !important;
  height: 150px !important;
  margin: 3px;
}
.btn{
  background-color: #5C6BC0 !important;
  border-radius: 100px;
  color: #FFFFFF;
  border: 0;
  padding: 8px;
  width: fit-content;
}
</style>
