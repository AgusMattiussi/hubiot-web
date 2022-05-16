<template>
  <v-container class="fill-height" fluid>
    <v-main class="fill-height mx-2">
      <v-sheet class="fill-height" elevation="24">
        <v-container class="secondary fill-height" fluid>
          <v-row class="ma-0">
            <v-col><h1>Acciones</h1></v-col>
          </v-row>
          <v-row v-for="action in routine.actions" :key="action.id">
            <v-col md="4"></v-col>
            <v-col md="4">
              <v-card class="accent">
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title class="text-h5 font-weight-bold">
                    {{ action.device.name }}
                  </v-card-title>
                  <v-card-subtitle class="text-left">
                    {{ action.actionName }}
                  </v-card-subtitle>
                </div>
                <v-avatar class="ma-3" size="125">
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
              <v-btn fab medium color="primary" @click="execute">
                <v-icon light>
                  mdi-cat
                </v-icon>
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
    },
    ...mapGetters('devices', {
      $getDevices: 'get'
    }),
    ...mapActions('routines', {
      $getRoutine: 'get',
      $getAllRoutines: 'getAll',
      $execute: 'executeRoutine'
    })
  },
  async created () {
    await this.$getAllRoutines()
    this.routine = await this.$getRoutine(this.routineID)
  }
}
</script>

<style scoped>
.btn{
  background-color: #d14545;
  border-radius: 100px;
  border: 0;
}
</style>
