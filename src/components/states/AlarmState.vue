<template>
  <v-container @click="getAlarmState" class="fill-height pa-0 ma-0">
    <ul class="list">
      <li v-if="alarm.status === 'disarmed'">Apagada</li>
      <li v-else>Encendida</li>
    </ul>
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
      alarm: null
    }
  },
  computed: {
    ...mapState('devices', {
      devices: (state) => state.devices
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
        console.log('xd')
      }
    }
  },
  async created () {
    await this.getAlarmState()
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
