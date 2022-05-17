<template>
  <v-container @click="getSpeakerState" class="fill-height pa-0 ma-0">
    <img v-if="loading"
         :src="require('@/assets/ajax-loader.gif')"
         alt="loading" />
    <div v-else class="actions">
      <div class="actions">
        <div class="action">
          <button class="btn" @click="previousSong">
            <v-icon class="mx-auto" color="black">
              mdi-skip-previous
            </v-icon>
          </button>
          <p>Previous</p>
        </div>
        <div class="action">
          <div v-if="speaker.status === 'playing'" @click="pause">
            <button class="btn">
              <v-icon class="mx-auto" color="black">
                mdi-pause
              </v-icon>
            </button>
            <p>Pausar</p>
          </div>
          <div v-else>
            <button class="btn" @click="resume">
              <v-icon class="mx-auto" color="black">
                mdi-play
              </v-icon>
            </button>
            <p>Resume</p>
          </div>
        </div>
        <div class="action">
        <div v-if="speaker.status === 'stopped' ">
          <button class="btn" @click="play">
            <v-icon class="mx-auto" color="black">
              mdi-play
            </v-icon>
          </button>
          <p>Play</p>
        </div>
        <div v-else @click="stop">
          <button class="btn">
            <v-icon class="mx-auto" color="black">
              mdi-stop
            </v-icon>
          </button>
          <p>Stop</p>
        </div>
      </div>
        <div class="action">
          <button class="btn" @click="nextSong">
            <v-icon class="mx-auto" color="black">
              mdi-skip-next
            </v-icon>
          </button>
          <p>Next</p>
        </div>
      </div>
    </div>
    <v-main>
      <v-slider v-model="sliderOpt.val" :color="sliderOpt.color" :label="sliderOpt.label" max="10" min="0" @end="volumeChanged"></v-slider>
      <v-autocomplete
        height="10px"
        class="autocomplete ps-2"
        :items="supportedGenres"
        placeholder="Seleccionar género"
        rounded
        solo
        item-text="name"
        auto-select-first
        return-object
        hide-no-data
        v-model="selectedGenre"
        value=""
        hide-details
        @change="updatedGenre">
      </v-autocomplete>
    </v-main>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'SpeakerActions',
  props: {
    deviceId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      speaker: null,
      selectedGenre: '',
      supportedGenres: [
        'classical',
        'country',
        'dance',
        'latina',
        'pop',
        'rock'
      ],
      loading: false,
      sliderOpt: { label: 'Volumen', val: 3, color: 'orange' }
    }
  },
  computed: {
    ...mapState('devices', {
      devices: (state) => state.devices
    })
  },
  methods: {
    ...mapActions('devices', {
      $getSpeakerState: 'getState',
      $executeAction: 'execute'
    }),
    stateUpdated () {
      this.$root.$emit('speakerStateUpdated')
    },
    async play () {
      try {
        const action = {
          name: 'play',
          data: []
        }
        await this.$executeAction({ deviceId: this.deviceId, action })
        await this.getSpeakerState()
        this.stateUpdated()
      } catch (e) {
        console.log('Error en ' + 'play')
      }
    },
    async pause () {
      try {
        const action = {
          name: 'pause',
          data: []
        }
        await this.$executeAction({ deviceId: this.deviceId, action })
        await this.getSpeakerState()
        this.stateUpdated()
      } catch (e) {
        console.log('Error en ' + 'pause')
      }
    },
    async resume () {
      try {
        const action = {
          name: 'resume',
          data: []
        }
        await this.$executeAction({ deviceId: this.deviceId, action })
        await this.getSpeakerState()
        this.stateUpdated()
      } catch (e) {
        console.log('Error en ' + 'pause')
      }
    },
    async stop () {
      try {
        const action = {
          name: 'stop',
          data: []
        }
        await this.$executeAction({ deviceId: this.deviceId, action })
        await this.getSpeakerState()
        this.stateUpdated()
      } catch (e) {
        console.log('Error en ' + 'stop')
      }
    },
    async previousSong () {
      try {
        const action = {
          name: 'previousSong',
          data: []
        }
        await this.$executeAction({ deviceId: this.deviceId, action })
        await this.getSpeakerState()
        this.stateUpdated()
      } catch (e) {
        console.log('Error en ' + 'previousSong')
      }
    },
    async nextSong () {
      try {
        const action = {
          name: 'nextSong',
          data: []
        }
        await this.$executeAction({ deviceId: this.deviceId, action })
        await this.getSpeakerState()
        this.stateUpdated()
      } catch (e) {
        console.log('Error en ' + 'nextSong')
      }
    },
    async volumeChanged (value) {
      try {
        const action = {
          name: 'setVolume',
          data: [value]
        }
        await this.$executeAction({ deviceId: this.deviceId, action })
        await this.getSpeakerState()
        this.stateUpdated()
      } catch (e) {
        console.log('Error en ' + 'setVolume')
      }
    },
    async updatedGenre () {
      try {
        const action = {
          name: 'setGenre',
          data: [this.selectedGenre]
        }
        await this.$executeAction({ deviceId: this.deviceId, action })
        await this.getSpeakerState()
        this.stateUpdated()
      } catch (e) {
        console.log('Error en ' + 'setVolume')
      }
    },
    async getSpeakerState () {
      try {
        this.speaker = await this.$getSpeakerState(this.deviceId)
      } catch (e) {
        // this.setResult(e)
        console.log('getSpeakerStateError')
      }
    }
  },
  async created () {
    this.loading = true
    await this.getSpeakerState()
      // eslint-disable-next-line no-return-assign
      .then(() => {
        this.loading = false
        this.sliderOpt.val = this.speaker.volume
      })
  }
}
</script>

<style scoped>
.actions {
  display: flex;
  justify-content: space-between;
  margin: auto;
}
.action{
  flex: auto;
  margin: 10px;
}
.btn{
  background-color: #FF8A65;
  border-radius: 100px;
  border: 2px solid black;
  height: 40px;
  width: 40px;
}

</style>
