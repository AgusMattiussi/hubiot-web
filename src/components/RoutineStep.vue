<template>
  <v-container>
    <v-row>
      <v-col md="1"/>
      <v-col md="4">
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
         @change="updatedDevice">
        </v-autocomplete>
      </v-col>
      <v-col md="4">
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
      <v-col md="3">
        <v-text-field v-if="req === 1"
                      type="text"
                      clearable
                      class="textBox rounded"
                      placeholder="Valor"
                      v-model="userInput"
                      @change="updatedParams"
                      :rules="[getRule()(userInput, true)]"
        />
        <v-autocomplete
          v-if="req === 2"
          class="autocomplete"
          :items="getValues()"
          placeholder="Modo"
          rounded
          solo
          return-object
          hide-no-data
          @change="updatedParams"
          v-model="userInput"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import translations from '@/store/englishTranslations'
import routineStepRequirements from '@/store/routineStepRequirements'

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
      selectedAction: {},
      actionParams: '',
      routineStepRequirements,
      userInput: '',
      req: null
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
    updatedDevice () {
      this.req = 0
      this.updated()
    },
    updatedParams () {
      this.actionParams = this.userInput
      this.updated()
    },
    updated () {
      this.typeSelectedDevice = this.$store.getters['deviceTypes/getTypeForDeviceID'](this.selectedDevice.type.id)
      this.updateRoutineStepRequirements()
      this.$emit('updatedStep', { id: this.id, device: this.selectedDevice, action: { name: this.selectedAction.name, params: this.translateModeIfNeeded(this.actionParams.toString()) } })
    },
    translate (action) {
      return translations[action.name]
    },
    updateRoutineStepRequirements () {
      this.req = routineStepRequirements[this.selectedDevice.type.name][this.selectedAction.name].type
    },
    getRule () {
      return routineStepRequirements[this.selectedDevice.type.name][this.selectedAction.name].rule
    },
    getValues () {
      return routineStepRequirements[this.selectedDevice.type.name][this.selectedAction.name].values
    },
    getTranslator () {
      return routineStepRequirements[this.selectedDevice.type.name][this.selectedAction.name].translator
    },
    translateModeIfNeeded (str) {
      const translator = this.getTranslator()
      if (translator != null) {
        return translator(str)
      }
      return str
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
