<template>
  <v-container class="fill-height container">
    <img v-if="loading"
         :src="require('@/assets/ajax-loader.gif')"
         alt="loading">
    <div v-else class="actions">
      <div class="actions">
        <div v-if="door.lock === 'unlocked'" class="action">
          <button class="btn" @click="lock">
            <v-icon class="icon">
              mdi-lock-outline
            </v-icon>
          </button>
          <p>Bloquear</p>
        </div>
        <div v-else class="action" @click="unlock">
          <button class="btn">
            <v-icon class="icon">
              mdi-lock-open-outline
            </v-icon>
          </button>
          <p>Desbloquear</p>
        </div>
      </div>
      <div class="actions">
        <div v-if="door.status === 'closed'" class="action">
          <button class="btn" @click="open">
            <v-icon class="icon">
              mdi-door-open
            </v-icon>
          </button>
          <p>Abrir</p>
        </div>
        <div v-else class="action">
          <button class="btn" @click="close">
            <v-icon class="icon">
              mdi-door
            </v-icon>
          </button>
          <p>Cerrar</p>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
// import { Action } from '@/api/devicesApi'

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
  methods: {
    ...mapActions('devices', {
      $getDoorState: 'getState',
      $executeAction: 'execute'
    }),
    stateUpdated () {
      this.$root.$emit('doorStateUpdated')
    },
    async getDoorState () {
      try {
        this.door = await this.$getDoorState(this.deviceId)
      } catch (e) {
        // this.setResult(e)
        console.log('getDoorStateError')
      }
    },
    async executeAction (actionName) {
      try {
        const action = {
          name: actionName,
          data: []
        }
        await this.$executeAction({ deviceId: this.deviceId, action })
        await this.getDoorState()
        this.stateUpdated()
      } catch (e) {
        console.log('Error en ' + actionName)
      }
    },
    async lock () {
      await this.executeAction('lock')
    },
    async unlock () {
      await this.executeAction('unlock')
    },
    async open () {
      await this.executeAction('open')
    },
    async close () {
      await this.executeAction('close')
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
.container{
  padding: 0;
  margin: 0;
}
.actions{
  display: flex;
  justify-content: space-between;
  margin: auto;
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
.icon{
  margin: auto;
  color: black;
}
</style>
