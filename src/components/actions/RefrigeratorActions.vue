<template>
  <v-container class="fill-height pa-0 ma-0">
    <img v-if="loading"
         :src="require('@/assets/ajax-loader.gif')"
         alt="loading">
    <div v-else class="actions">
      <div class="inputAction">
        <v-text-field type="text"
               clearable
               class="textBox rounded"
               placeholder="Temperatura Freezer"
               v-model="freezerTemp"
               :rules="[isFreezerTempValid(freezerTemp, true)]"
        />
        <v-btn class="btn2" @click="setFreezerTemperature"
        :disabled="!isFreezerTempValid(freezerTemp)">
          Modificar
        </v-btn>
      </div>
      <div class="inputAction">
        <v-text-field type="text"
                      clearable
                      class=" textBox rounded"
                      placeholder="Temperatura Heladera"
                      v-model="temperature"
                      :rules="[isRefrigeratorTempValid(temperature, true)]"
        />
        <v-btn class="btn2 " @click="setTemperature"
               :disabled="!isRefrigeratorTempValid(temperature)">
          Modificar
        </v-btn>
      </div>
      <div>
        <v-autocomplete
          class="autocomplete"
          :items="modes"
          placeholder="Modo"
          rounded
          solo
          return-object
          hide-no-data
          v-model="mode"
          @change="setMode(translateMode(mode))"
        >
        </v-autocomplete>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'RefrigeratorActions',
  props: {
    deviceId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      refrigerator: null,
      freezerTemp: null,
      temperature: null,
      mode: null,
      loading: false,
      modes: ['Predeterminado', 'Vacaciones', 'Fiesta']
    }
  },
  methods: {
    ...mapActions('devices', {
      $getRefrigeratorState: 'getState',
      $executeAction: 'execute'
    }),
    stateUpdated () {
      this.$root.$emit('refrigeratorStateUpdated')
    },
    isFreezerTempValid (temp, withMsg) {
      const msg = 'La temperatura del freezer debe estar entre -20°C y -8°C'
      if (temp >= -20 && temp <= -8) {
        return true
      } else {
        return withMsg != null ? msg : false
      }
    },
    isRefrigeratorTempValid (temp, withMsg) {
      const msg = 'La temperatura de la heladera debe estar entre 2°C y 8°C'
      if (temp >= 2 && temp <= 8) {
        return true
      } else {
        return withMsg != null ? msg : false
      }
    },
    translateMode (mode) {
      if (mode === 'Predeterminado') {
        this.mode = 'default'
      } else if (mode === 'Vacaciones') {
        this.mode = 'vacation'
      } else {
        this.mode = 'party'
      }
    },
    async getRefrigeratorState () {
      try {
        this.refrigerator = await this.$getRefrigeratorState(this.deviceId)
      } catch (e) {
        // this.setResult(e)
        console.log('getRefrigeratorStateError')
      }
    },
    async executeAction (action) {
      try {
        await this.$executeAction({ deviceId: this.deviceId, action })
        await this.getRefrigeratorState()
        this.stateUpdated()
      } catch (e) {
        console.log('Error en ' + action.name)
      }
    },
    async setFreezerTemperature () {
      const action = {
        name: 'setFreezerTemperature',
        data: [Math.trunc(this.freezerTemp)]
      }
      await this.executeAction(action)
    },
    async setTemperature () {
      const action = {
        name: 'setTemperature',
        data: [Math.trunc(this.temperature)]
      }
      await this.executeAction(action)
    },
    async setMode () {
      const action = {
        name: 'setMode',
        data: [this.mode]
      }
      await this.executeAction(action)
    }
  },
  async created () {
    this.loading = true
    await this.getRefrigeratorState()
      // eslint-disable-next-line no-return-assign
      .then(() => this.loading = false)
  }
}
</script>

<style scoped>
.actions{
  display: inline-block;
  margin: auto;
}
.inputAction{
  display: flex;
  justify-content: space-between;
  max-width: 400px;
}

.textBox{
  outline-color: #5C6BC0;
  padding: 8px;
  width: 180px !important;
  display: block;
}
.btn2{
  background-color: #FF8A65 !important;
  border-radius: 100px;
  border: 2px solid black;
  margin-left: 10px;
  height: 40px;
  width: 140px;
}
</style>
