<template>
  <v-container @click="getACState" class="fill-height pa-0 ma-0">
    <ul class="list">
      <li v-if="ac.status === 'off'">Apagado</li>
      <li v-else>Encendido</li>

      <li>Temperatura: {{ac.temperature}}°C</li>

      <li>Modo: {{ ac.mode }}</li>

      <li>Aspas verticales: {{ ac.verticalSwing }}</li>

      <li>Aspas horizontales: {{ ac.horizontalSwing }}</li>

      <li>Velocidad: {{ ac.fanSpeed }}</li>
    </ul>
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
      ac: null
    }
  },
  computed: {
    ...mapState('devices', {
      devices: (state) => state.devices
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
        console.log('xd')
      }
    }
  },
  async created () {
    await this.getAcState()
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
