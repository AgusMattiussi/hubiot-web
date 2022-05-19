<template>
  <v-container class="fill-height container">
    <img v-if="loading"
         :src="require('@/assets/ajax-loader.gif')"
         alt="loading">
    <div v-else>
      <v-card class="stateCard">
        <v-card-text>
          <ul class="list">
            <li v-if="alarm.status === 'disarmed'">
              <v-icon>
                mdi-lock-open
              </v-icon>
              Deshabilitada
            </li>
            <li v-else-if="alarm.status === 'armedStay'">
              <v-icon>
                mdi-circle
              </v-icon>
              Zona de monitoreo pasiva
            </li>
            <li v-else>
              <v-icon>
                mdi-lock
              </v-icon>
              Habilitada
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
  name: 'AlarmState',
  props: {
    deviceId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      result: null,
      alarm: null,
      loading: false
    }
  },
  computed: {
    ...mapState('devices', {
      devices: (state) => state.devices
    })
  },
  mounted () {
    this.$root.$on('alarmStateUpdated', () => {
      this.getAlarmState()
    })
  },
  methods: {
    ...mapActions('devices', {
      $getAlarmState: 'getState'
    }),
    setResult (result) {
      this.result = JSON.stringify(result, null, 2)
    },
    async getAlarmState () {
      try {
        this.alarm = await this.$getAlarmState(this.deviceId)
      } catch (e) {
        // this.setResult(e)
        console.log('StateError')
      }
    }
  },
  async created () {
    this.loading = true
    await this.getAlarmState()
      // eslint-disable-next-line no-return-assign
      .then(() => this.loading = false)
  }
}
</script>

<style scoped>
.container{
  padding: 0;
  margin: 0;
}
.stateCard{
  min-height: 5vh;
  width: auto;
  background-color: #C5CAE9;
  padding-right: 10px;
}
.list {
  list-style: none;
  color: black;
  font-size: 16px;
}
</style>
