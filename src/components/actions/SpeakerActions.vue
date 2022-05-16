<template>
  <v-container @click="getSpeakerState" class="fill-height pa-0 ma-0">
    <img v-if="loading"
         :src="require('@/assets/ajax-loader.gif')"
         alt="loading">
    <div v-else class="actions">
      <div class="action">
        <div class="action" @click="volumeUp">
          <button class="btn">
            <v-icon class="mx-auto" color="black">
              mdi-plus
            </v-icon>
          </button>
        </div>
        <div class="action" @click="volumeDown">
          <button class="btn" @click="close">
            <v-icon class="mx-auto" color="black">
              mdi-minus
            </v-icon>
          </button>
        </div>
      </div>
    </div>
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
      $getSpeakerState: 'getState',
      $executeAction: 'execute'
    }),
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
      .then(() => this.loading = false)
  }
}
</script>

<style scoped>
.actions{
  display: flex;
  justify-content: space-between;
}
.action{
  margin-right: 100px;
}
.btn{
  background-color: #FF8A65;
  border-radius: 100px;
  border: 2px solid black;
  margin-bottom: 5px;
  height: 40px;
  width: 40px;
}
</style>
