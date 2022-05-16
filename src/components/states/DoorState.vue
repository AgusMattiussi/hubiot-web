<template>
<v-container @click="getDoorState" class="fill-height pa-0 ma-0">
  <img v-if="loading"
       :src="require('@/assets/ajax-loader.gif')"
       alt="loading">
  <div v-else>
    <ul class="list">
      <li v-if="door.status === 'closed'">Cerrada</li>
      <li v-else>Abierta</li>
      <li v-if="door.lock === 'unlocked'">Desbloqueada</li>
      <li v-else>Bloqueada</li>
    </ul>
  </div>
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
      door: null,
      loading: false
    }
  },
  computed: {
    ...mapState('devices', {
      devices: (state) => state.devices
    })
  },
  mounted () {
    this.$root.$on('doorStateUpdated', (msg) => {
      this.getDoorState()
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
        console.log('StateError')
      }
    }
  },
  async created () {
    this.loading = true
    await this.getDoorState()
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
