<template>
  <v-container>
    <v-row>
      <v-col md="6">
        <v-autocomplete
          height="10px"
          class="autocomplete pa-2"
          :items="devices"
          placeholder="Seleccionar dispositivo"
          rounded
          solo
          item-text="name"
          auto-select-first
          return-object
          hide-no-data
          v-model="selectedDevice"
          value=""
         @change="updateValue">
        </v-autocomplete>
      </v-col>
      <v-col md="6">
        <v-autocomplete
          height="10px"
          class="autocomplete pa-2"
          :items="selectedDevice.actions"
          :disabled="selectedDevice.id == null"
          placeholder="Seleccionar acción"
          rounded
          solo
          item-text="name"
          auto-select-first
          return-object
          hide-no-data
          v-model="selectedAction">
        </v-autocomplete>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import store from '@/store/store'
export default {
  name: 'RoutineStep.vue',
  updated: e => {
    this.$emit('updated', { device: this.selectedDevice, action: this.selectedAction })
  },
  data () {
    return {
      devices: store.devices,
      selectedDevice: {},
      selectedAction: {}
    }
  },
  methods: {
    updateValue: _ => this.updateRoutine()
  }
}
</script>

<style scoped>

</style>
