<template>
  <v-container>
    <v-row>
      <v-col md="6">
        <v-autocomplete
          height="10px"
          class="autocomplete ps-2"
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
          hide-details
         @change="updated">
        </v-autocomplete>
      </v-col>
      <v-col md="6">
        <v-autocomplete
          height="10px"
          class="autocomplete ps-2"
          :items="selectedDevice.actions"
          :disabled="selectedDevice.id == null"
          placeholder="Seleccionar acción"
          rounded
          solo
          item-text="name"
          auto-select-first
          return-object
          hide-details
          hide-no-data
          v-model="selectedAction"
          @change="updated">
        </v-autocomplete>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import store from '@/store/store'
export default {
  name: 'RoutineStep.vue',
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      devices: store.devices,
      selectedDevice: {},
      selectedAction: {}
    }
  },
  methods: {
    updated () {
      this.$emit('updatedStep', { id: this.id, device: this.selectedDevice, action: this.selectedAction })
    }
  }
}
</script>

<style scoped>
</style>
