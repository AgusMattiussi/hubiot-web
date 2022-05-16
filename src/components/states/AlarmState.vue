<template>
  <v-container @click="getAlarmState" class="fill-height pa-0 ma-0">
    <img v-if="loading"
         :src="require('@/assets/ajax-loader.gif')"
         alt="loading">
    <div v-else>
      <ul class="list">
        <li v-if="alarm.status === 'disarmed'">Apagada</li>
        <li v-else>Encendida</li>
      </ul>
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
    this.loading = true
    await this.getAlarmState()
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
