<template>
  <v-container @click="getAcState" class="fill-height pa-0 ma-0">
    <img v-if="loading"
         :src="require('@/assets/ajax-loader.gif')"
         alt="loading">
    <div v-else>
      <v-card min-height="10vh" width="78vh" class="secondary">
        <v-card-text>
          <ul class="list">
            <li v-if="ac.status === 'off'">
              <v-icon>
                mdi-close-circle-outline
              </v-icon>
              Apagado
            </li>
            <li v-else>
              <v-icon>
                mdi-circle-outline
              </v-icon>
              Encendido
            </li>
            <li>
              <v-icon>
                mdi-thermometer
              </v-icon>
              Temperatura: {{ac.temperature}}°C
            </li>
            <li>
              <v-icon>
                mdi-circle
              </v-icon>
              Modo: {{translateMode(ac.mode)}}
            </li>
            <li>
              <v-icon>
                mdi-arrow-split-vertical
              </v-icon>
              Aspas verticales: {{ ac.verticalSwing }}{{ac.verticalSwing !== 'auto' ? '°' : ''}}
            </li>
            <li>
              <v-icon>
                mdi-arrow-split-horizontal
              </v-icon>
              Aspas horizontales: {{ ac.horizontalSwing }}{{ac.horizontalSwing !== 'auto' ? '°' : ''}}
            </li>
            <li>
              <v-icon>
                mdi-weather-windy
              </v-icon>
              Velocidad: {{ ac.fanSpeed }}
            </li>
          </ul>
        </v-card-text>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'AcState',
  props: {
    deviceId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      result: null,
      ac: null,
      loading: false
    }
  },
  computed: {
    ...mapState('devices', {
      devices: (state) => state.devices
    })
  },
  mounted () {
    this.$root.$on('acStateUpdated', (msg) => {
      this.getAcState()
    })
  },
  methods: {
    ...mapActions('devices', {
      $getAcState: 'getState'
    }),
    setResult (result) {
      this.result = JSON.stringify(result, null, 2)
    },
    async getAcState () {
      try {
        this.ac = await this.$getAcState(this.deviceId)
      } catch (e) {
        // this.setResult(e)
        console.log('StateError')
      }
    },
    translateMode (mode) {
      if (mode === 'cool') {
        return 'Frío'
      } else if (mode === 'heat') {
        return 'Calor'
      } else if (mode === 'fan') {
        return 'Ventilador'
      } else {
        return ''
      }
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
.list {
  list-style: none;
  color: black;
  font-size: 16px;
}
</style>
