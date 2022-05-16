<template>
  <v-container @click="getRefrigeratorState" class="fill-height pa-0 ma-0">
    <img v-if="loading"
         :src="require('@/assets/ajax-loader.gif')"
         alt="loading">
    <div v-else>
      <v-card min-height="10vh" width="60vh" class="secondary">
        <v-card-text>
          <ul class="list">
            <li>
              <v-icon>
                mdi-fridge
              </v-icon>
              Modo: {{translateMode(refrigerator.mode)}}
            </li>
            <li>
              <v-icon>
                mdi-temperature-celsius
              </v-icon>
              Temperatura: {{ refrigerator.temperature }} °C
            </li>
            <li>
              <v-icon>
                mdi-thermometer-lines
              </v-icon>
              Temperatura Freezer: {{ refrigerator.freezerTemperature }} °C
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
  name: 'RefrigeratorState',
  props: {
    deviceId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      result: null,
      refrigerator: null,
      loading: false
    }
  },
  computed: {
    ...mapState('devices', {
      devices: (state) => state.devices
    })
  },
  mounted () {
    this.$root.$on('refrigeratorStateUpdated', (msg) => {
      this.getRefrigeratorState()
    })
  },
  methods: {
    ...mapActions('devices', {
      $getRefrigeratorState: 'getState'
    }),
    setResult (result) {
      this.result = JSON.stringify(result, null, 2)
    },
    async getRefrigeratorState () {
      try {
        this.refrigerator = await this.$getRefrigeratorState(this.deviceId)
      } catch (e) {
        // this.setResult(e)
        console.log('StateError')
      }
    },
    translateMode (mode) {
      if (mode === 'default') {
        return 'Predeterminado'
      } else if (mode === 'vacation') {
        return 'Vacaciones'
      } else if (mode === 'party') {
        return 'Fiesta'
      } else {
        return ''
      }
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
.list {
  list-style: none;
  color: black;
  font-size: 16px;
}
</style>
