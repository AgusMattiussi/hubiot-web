<template>
  <v-container class="fill-height pa-0 ma-0">
    <img v-if="loading"
         :src="require('@/assets/ajax-loader.gif')"
         alt="loading">
    <div v-else class="actions">
      <v-card min-height="10vh" width="auto" class="secondary pr-6">
        <v-card-text>
          <ul class="list">
            <li v-if="blinds.status === 'opened'">
              <v-icon>
                mdi-window-open-variant
              </v-icon>
              Abierta
            </li>
            <li v-else-if="blinds.status === 'opening'">
              <v-icon>
                mdi-reload
              </v-icon>
              Abriendo
            </li>
            <li v-else-if="blinds.status === 'closing'">
              <v-icon>
                mdi-reload
              </v-icon>
              Cerrando
            </li>
            <li v-else>
              <v-icon>
                mdi-blinds
              </v-icon>
              Cerrada
            </li>
            <li>
              <v-icon>
                mdi-arrow-right-drop-circle-outline
              </v-icon>
              Nivel actual: {{ blinds.currentLevel }}
            </li>
            <li>
              <v-icon>
                mdi-arrow-right-drop-circle-outline
              </v-icon>
              Nivel: {{ blinds.level }}
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
  name: 'BlindsState',
  props: {
    deviceId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      result: null,
      blinds: null,
      loading: false
    }
  },
  computed: {
    ...mapState('devices', {
      devices: (state) => state.devices
    })
  },
  mounted () {
    this.$root.$on('blindsStateUpdated', (msg) => {
      this.getBlindsState()
    })
  },
  methods: {
    ...mapActions('devices', {
      $getBlindsState: 'getState'
    }),
    setResult (result) {
      this.result = JSON.stringify(result, null, 2)
    },
    async getBlindsState () {
      try {
        this.blinds = await this.$getBlindsState(this.deviceId)
      } catch (e) {
        // this.setResult(e)
        console.log('StateError')
      }
    }
  },
  async created () {
    this.loading = true
    await this.getBlindsState()
      // eslint-disable-next-line no-return-assign
      .then(() => this.loading = false)
  }
}
</script>

<style scoped>
.actions{
  display: flex;
  justify-content: space-between;
}
.list {
  list-style: none;
  color: black;
  font-size: 16px;
}
</style>
