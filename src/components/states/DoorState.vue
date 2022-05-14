<template>
<v-container @click="getDoorState" class="fill-height pa-0 ma-0">
  <ul>
    <li> Abierta: {{door.status}}</li>
    <li> Bloqueada: {{door.lock}}</li>
  </ul>
</v-container>
</template>

<script>

import { mapActions, mapState } from 'vuex'

export default {
  name: 'DoorState',
  props: {
    deviceId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      result: null,
      door: null
    }
  },
  computed: {
    ...mapState('devices', {
      devices: (state) => state.devices
    })
  },
  methods: {
    ...mapActions('devices', {
      $getDoorState: 'getState'
    }),
    setResult (result) {
      this.result = JSON.stringify(result, null, 2)
    },
    async getDoorState () {
      try {
        this.door = await this.$getDoorState(this.deviceId)
      } catch (e) {
        // this.setResult(e)
        console.log('xd')
      }
    }
  },
  async created () {
    await this.getDoorState()
  }
}
</script>

<style scoped>

</style>
