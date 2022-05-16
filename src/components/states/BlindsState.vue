<template>
  <v-container @click="getBlindsState" class="fill-height pa-0 ma-0">
    <img v-if="loading"
         :src="require('@/assets/ajax-loader.gif')"
         alt="loading">
    <div v-else class="actions">
      <ul class="list">
        <li v-if="blinds.status === 'opened'">Abierta</li>
        <li v-else>Cerrada</li>

        <li>Nivel: {{ blinds.level }}</li>
      </ul>
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
        console.log('xd')
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
