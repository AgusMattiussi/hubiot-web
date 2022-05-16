<template>
  <v-container class="fill-height pa-0 ma-0">
    <img v-if="loading"
         :src="require('@/assets/ajax-loader.gif')"
         alt="loading">
    <div v-else class="actions">
      <div class="actions">
        <div v-if="ac.status === 'off'">
          <button class="btn" @click="turnOn">
            <v-icon class="mx-auto" color="black">
              mdi-lightning-bolt-circle
            </v-icon>
          </button>
          <p>Encender</p>
        </div>
        <div v-else>
          <button class="btn" @click="turnOff">
            <v-icon class="mx-auto" color="black">
              mdi-minus-circle-off-outline
            </v-icon>
          </button>
          <p>Apagar</p>
        </div>
        <div class="inputAction">
          <v-text-field type="text"
                        clearable
                        class="textBox rounded"
                        placeholder="Temperatura"
                        v-model="temperature"
                        :rules="[isTemperatureValid(temperature, true)]"
          />
          <v-btn :disabled="!isTemperatureValid(temperature)" class="btn2" @click="setTemperature">
            Modificar
          </v-btn>
        </div>
        <div class="inputAction">
          <v-autocomplete
            class="autocomplete"
            :items="supportedModes"
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
      <div class="inputAction">
          <v-autocomplete
            class="autocomplete"
            :items="supportedVerticalSwings"
            placeholder="Desplazamiento de Aspas Verticales"
            rounded
            solo
            return-object
            hide-no-data
            v-model="verticalSwing"
            @change="setVerticalSwing(verticalSwing)"
          >
          </v-autocomplete>
      </div>
      <div class="inputAction">
        <v-autocomplete
          class="autocomplete"
          :items="supportedHorizontalSwings"
          placeholder="Desplazamiento de Aspas Horizontales"
          rounded
          solo
          return-object
          hide-no-data
          v-model="horizontalSwing"
          @change="setHorizontalSwing(horizontalSwing)"
        >
        </v-autocomplete>
      </div>
      <div class="inputAction">
        <v-autocomplete
          class="autocomplete"
          :items="supportedFanSpeeds"
          placeholder="Velocidad del Ventilador"
          rounded
          solo
          return-object
          hide-no-data
          v-model="fanSpeed"
          @change="setFanSpeed(fanSpeed)"
        >
        </v-autocomplete>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'AcActions',
  props: {
    deviceId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      ac: null,
      loading: false,
      temperature: null,
      mode: null,
      verticalSwing: null,
      horizontalSwing: null,
      fanSpeed: null,
      supportedModes: ['Frío', 'Calor', 'Ventilador'],
      supportedVerticalSwings: ['auto', '22', '45', '67', '90'],
      supportedHorizontalSwings: ['auto', '-90', '-45', '0', '45', '90'],
      supportedFanSpeeds: ['auto', '25', '50', '75', '100']
    }
  },
  methods: {
    ...mapActions('devices', {
      $getAcState: 'getState',
      $executeAction: 'execute'
    }),
    stateUpdated () {
      this.$root.$emit('acStateUpdated')
    },
    async getAcState () {
      try {
        this.ac = await this.$getAcState(this.deviceId)
      } catch (e) {
        // this.setResult(e)
        console.log('getAcStateError')
      }
    },
    isTemperatureValid (temp, withMsg) {
      const msg = 'La temperatura debe estar entre 18°C y 24°C '
      if (temp >= 18 && temp <= 24) {
        return true
      } else {
        return withMsg ? msg : false
      }
    },
    translateMode (mode) {
      if (mode === 'Frío') {
        this.mode = 'cool'
      } else if (mode === 'Calor') {
        this.mode = 'heat'
      } else {
        this.mode = 'fan'
      }
    },
    async executeAction (actionName, paramsArray) {
      const action = {
        name: actionName,
        data: paramsArray
      }
      try {
        await this.$executeAction({ deviceId: this.deviceId, action })
        await this.getAcState()
        this.stateUpdated()
      } catch (e) {
        console.log('Error en ' + action.name)
      }
    },
    async turnOn () {
      await this.executeAction('turnOn')
    },
    async turnOff () {
      await this.executeAction('turnOff')
    },
    async setTemperature () {
      await this.executeAction('setTemperature', [Math.trunc(this.temperature)])
    },
    async setMode () {
      await this.executeAction('setMode', [this.mode])
    },
    async setVerticalSwing () {
      await this.executeAction('setVerticalSwing', [this.verticalSwing])
    },
    async setHorizontalSwing () {
      await this.executeAction('setHorizontalSwing', [this.horizontalSwing])
    },
    async setFanSpeed () {
      await this.executeAction('setFanSpeed', [this.fanSpeed])
    }
  },
  async created () {
    this.loading = true
    await this.getAcState()
      // eslint-disable-next-line no-return-assign
      .then(() => this.loading = false)
  }
}
</script>

<style scoped>
.actions{
  justify-content: space-between;
}
.btn{
  background-color: #FF8A65;
  border-radius: 100px;
  border: 2px solid black;
  margin-bottom: 10px;
  height: 40px;
  width: 40px;
}
.inputAction{
  display: flex;
  justify-content: space-between;
}
.textBox{
  outline-color: #5C6BC0;
  padding: 8px;
  width: 65px;
  display: block;
}
.btn2{
  background-color: #FF8A65 !important;
  border-radius: 100px;
  border: 2px solid black;
  margin-left: 10px;
  padding: 5px;
  height: 40px;
  width: fit-content;
}
</style>
