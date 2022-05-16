<template>
  <v-container @click="getSpeakerState" class="fill-height pa-0 ma-0">
    <img v-if="loading"
         :src="require('@/assets/ajax-loader.gif')"
         alt="loading">
    <div v-else>
      <v-card min-height="10vh" width="78vh" class="secondary">
        <v-card-text>
          <ul class="list">
            <li v-if="speaker.status === 'stopped'">
              <v-icon>
                mdi-stop
              </v-icon>
              Detenido
            </li>
            <li v-else-if="speaker.status === 'playing'">
              <v-icon>
                mdi-play
              </v-icon>
              Reproduciendo
            </li>
            <li v-else-if="speaker.status === 'paused'">
              <v-icon>
                mdi-stop
              </v-icon>
              Detenido
            </li>

            <li>
              <v-icon>
                mdi-volume-high
              </v-icon>
              Volumen: {{speaker.volume}}
            </li>
            <li v-if="speaker.status === 'stopped'" ></li>
            <li v-else>
              <v-icon>
                mdi-music-note
              </v-icon>
              Género: {{ speaker.genre }}
            </li>
            <li v-if="speaker.status === 'playing' || speaker.status === 'paused'">
              <v-icon>
                mdi-details
              </v-icon>
              {{ speaker.song.title }} | {{ speaker.song.artist }}
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
  mounted () {
    this.$root.$on('speakerStateUpdated', (msg) => {
      this.getSpeakerState()
    })
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
        console.log('StateError')
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
