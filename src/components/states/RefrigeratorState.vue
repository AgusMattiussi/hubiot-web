<template>
  <v-container @click="getRefrigeratorState" class="fill-height pa-0 ma-0">
    <ul class="list">
      <li>Modo: {{refrigerator.mode}}</li>

      <li>Temperatura: {{ refrigerator.temperature }}</li>

      <li>Temperatura Freezer: {{ refrigerator.freezerTemperature }}</li>
    </ul>
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
      refrigerator: null
    }
  },
  computed: {
    ...mapState('devices', {
      devices: (state) => state.devices
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
        console.log('xd')
      }
    }
  },
  async created () {
    await this.getRefrigeratorState()
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
