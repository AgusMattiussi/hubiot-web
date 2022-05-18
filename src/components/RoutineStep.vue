<template>
  <v-container>
    <v-row>
      <v-col>
        <v-autocomplete
          height="10px"
          class="autocomplete"
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
      <v-col>
        <v-autocomplete
          height="10px"
          class="autocomplete"
          :items="typeSelectedDevice.actions"
          :disabled="selectedDevice.id == null"
          placeholder="Seleccionar acción"
          rounded
          solo
          :item-text="translate"
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
import { mapActions, mapState } from 'vuex'
import translations from '@/store/translations'

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
      typeSelectedDevice: {},
      selectedDevice: {},
      selectedAction: {}
    }
  },
  computed: {
    ...mapState('devices', {
      devices: (state) => state.devices
    })
  },
  methods: {
    ...mapActions('routines', {
      $getAllDevices: 'getAll'
    }),
    ...mapActions('deviceTypes', {
      $getAllTypes: 'getAll'
    }),
    updated () {
      this.typeSelectedDevice = this.$store.getters['deviceTypes/getTypeForDeviceID'](this.selectedDevice.type.id)
      this.$emit('updatedStep', { id: this.id, device: this.selectedDevice, action: this.selectedAction })
    },
    translate (action) {
      return translations[action.name]
    }
  },
  async created () {
    await this.$getAllTypes()
    await this.$getAllDevices()
  }
}
</script>

<style scoped>
.autocomplete{
  padding: 2px;
}
</style>
