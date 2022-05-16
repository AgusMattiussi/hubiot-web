<template>
  <v-container @click="getDoorState" class="fill-height pa-0 ma-0">
    <img v-if="loading"
         :src="require('@/assets/ajax-loader.gif')"
         alt="loading">
    <div v-else class="actions">
      <div class="actions">
        <div v-if="door.lock === 'unlocked'" class="action">
          <button class="btn" @click="lock">
            <v-icon class="mx-auto" color="black">
              mdi-lock-outline
            </v-icon>
          </button>
          <p>Bloquear</p>
        </div>
        <div v-else class="action" @click="unlock">
          <button class="btn">
            <v-icon class="mx-auto" color="black">
              mdi-lock-open-outline
            </v-icon>
          </button>
          <p>Desbloquear</p>
        </div>
      </div>
      <div class="actions">
        <div v-if="door.status === 'closed'" class="action" @click="open">
          <button class="btn">
            <v-icon class="mx-auto" color="black">
              mdi-key
            </v-icon>
          </button>
          <p>Abrir</p>
        </div>
        <div v-else class="action">
          <button class="btn" @click="close">
            <v-icon class="mx-auto" color="black">
              mdi-door-closed-lock
            </v-icon>
          </button>
          <p>Cerrar</p>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'DoorActions',
  props: {
    deviceId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      door: null,
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
      $getDoorState: 'getState',
      $executeAction: 'execute'
    }),
    async getDoorState () {
      try {
        this.door = await this.$getDoorState(this.deviceId)
      } catch (e) {
        // this.setResult(e)
        console.log('getDoorStateError')
      }
    },
    async lock () {
      const action = {
        name: 'lock',
        data: []
      }
      try {
        await this.$executeAction(this.deviceId, action)
        await this.getDoorState()
      } catch (e) {
        // this.setResult(e)
        console.log('lockError')
      }
    },
    async unlock () {
      const action = {
        name: 'unlock',
        data: []
      }
      try {
        await this.$executeAction(this.deviceId, action)
        await this.getDoorState()
      } catch (e) {
        // this.setResult(e)
        console.log('unlockError')
      }
    },
    async open () {
      const action = {
        name: 'open',
        data: []
      }
      try {
        await this.$executeAction(this.deviceId, action)
        await this.getDoorState()
      } catch (e) {
        // this.setResult(e)
        console.log('openError')
      }
    },
    async close () {
      const action = {
        name: 'close',
        data: []
      }
      try {
        await this.$executeAction(this.deviceId, action)
        await this.getDoorState()
      } catch (e) {
        // this.setResult(e)
        console.log('closeError')
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
.actions{
  display: flex;
  justify-content: space-between;
}
.action{
  margin-right: 20px;
}
.btn{
  background-color: #FF8A65;
  border-radius: 100px;
  border: 2px solid black;
  height: 40px;
  width: 40px;
}
</style>
