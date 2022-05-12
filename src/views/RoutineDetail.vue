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
                    {{ device(action.deviceID).name }}
                  </v-card-title>
                  <v-card-subtitle class="text-left">
                    {{ actionForDevice(action.deviceID, action.actionID).name }}
                  </v-card-subtitle>
                  <v-card-actions>
                    <DeleteButton/>
                  </v-card-actions>
                </div>
                <v-avatar class="ma-3" size="125">
                  <v-img :src="require(`@/assets/${device(action.deviceID).image}`)"></v-img>
                </v-avatar>
              </div>
            </v-card>
            </v-col>
            <v-col md="4"></v-col>
          </v-row>
          <v-row></v-row>
        </v-container>
      </v-sheet>
    </v-main>
  </v-container>
</template>

<script>
import store from '@/store/store'
import DeleteButton from '@/components/DeleteButton'

export default {
  name: 'RoutineDetail.vue',
  components: {
    DeleteButton
  },
  data () {
    return {
      routineID: this.$route.params.id
    }
  },
  computed: {
    routine () {
      console.log(store.routines.find(routine => routine.id === parseInt(this.routineID)))
      // Parseo así matchea con el ===
      return store.routines.find(routine => routine.id === parseInt(this.routineID))
    }
  },
  methods: {
    device (id) {
      return store.devices.find(device => device.id === parseInt(id))
    },
    actionForDevice (deviceID, actionID) {
      const device = store.devices.find(device => device.id === parseInt(deviceID))
      return device.actions.find(action => action.id === parseInt(actionID))
    }
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
