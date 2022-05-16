<template>
  <v-container @click="getSpeakerState" class="fill-height pa-0 ma-0">
    <img v-if="loading"
         :src="require('@/assets/ajax-loader.gif')"
         alt="loading">
    <div v-else>
      <ul class="list">
        <li v-if="speaker.status === 'stopped'">Parado</li>
        <li v-else>Reproduciendo</li>

        <li>Volumen: {{speaker.volume}}</li>

        <li>Género: {{ speaker.genre }}</li>
      </ul>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'SpeakerState',
  props: {
    deviceId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      result: null,
      speaker: null,
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
      $getSpeakerState: 'getState'
    }),
    setResult (result) {
      this.result = JSON.stringify(result, null, 2)
    },
    async getSpeakerState () {
      try {
        this.speaker = await this.$getSpeakerState(this.deviceId)
      } catch (e) {
        // this.setResult(e)
        console.log('xd')
      }
    }
  },
  async created () {
    this.loading = true
    await this.getSpeakerState()
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
