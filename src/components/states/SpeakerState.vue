<template>
  <v-container class="fill-height container">
    <img v-if="loading"
         :src="require('@/assets/ajax-loader.gif')"
         alt="loading">
    <div v-else>
      <v-card class="stateCard">
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
    this.$root.$on('speakerStateUpdated', () => {
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
