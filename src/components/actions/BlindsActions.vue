<template>
  <v-container @click="getBlindsState" class="fill-height pa-0 ma-0">
    <img v-if="loading"
         :src="require('@/assets/ajax-loader.gif')"
         alt="loading">
    <div v-else class="actions">
      <div class="action">
        <div v-if="blinds.status === 'closed'" class="action">
          <button class="btn" @click="open">
            <v-icon class="mx-auto" color="black">
              mdi-window-open-variant
            </v-icon>
          </button>
          <p>Abrir</p>
        </div>
        <div v-else class="action">
          <button class="btn" @click="close">
            <v-icon class="mx-auto" color="black">
              mdi-blinds
            </v-icon>
          </button>
          <p>Cerrar</p>
        </div>
      </div>
      <div class="inputAction">
        <v-text-field type="text"
               class="textBox rounded"
               :rules="[isLevelValid(level, 'Debe ser un número entre 0 y 100')]"
               :placeholder="blinds.level"
               v-model="level"
        />
        <v-btn class="btn2" @click="setLevel" :disabled="!isLevelValid(level, null)">
          Cambiar nivel
        </v-btn>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'BlindsActions',
  props: {
    deviceId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      blinds: null,
      level: null,
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
      $getBlindsState: 'getState',
      $executeAction: 'execute'
    }),
    stateUpdated () {
      this.$root.$emit('blindsStateUpdated')
    },
    async getBlindsState () {
      try {
        this.blinds = await this.$getBlindsState(this.deviceId)
      } catch (e) {
        // this.setResult(e)
        console.log('getBlindStateError')
      }
    },
    async executeAction (action) {
      try {
        await this.$executeAction({ deviceId: this.deviceId, action })
        await this.getBlindsState()
        this.stateUpdated()
      } catch (e) {
        console.log('Error en ' + action.name)
      }
    },
    async open () {
      const action = {
        name: 'open',
        data: []
      }
      await this.executeAction(action)
    },
    async close () {
      const action = {
        name: 'close',
        data: []
      }
      await this.executeAction(action)
    },
    isLevelValid (level, msg) {
      if (level >= 0 && level <= 100) {
        return true
      }
      return msg == null ? false : msg
    },
    async setLevel () {
      const action = {
        name: 'setLevel',
        data: [this.level]
      }
      await this.executeAction(action)
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
.action{
  margin-right: 100px;
}
.btn{
  background-color: #FF8A65;
  border-radius: 100px;
  border: 2px solid black;
  height: 40px;
  width: 40px;
}
.inputAction{
  display: flex;
  justify-content: space-between;
}
.btn2{
  background-color: #FF8A65 !important;
  border-radius: 100px;
  border: 2px solid black !important;
  margin-left: 10px;
  height: 40px;
  width: 150px;
}
.textBox{
  outline-color: #5C6BC0;
  padding: 8px;
  width: 58px;
  display: block;
}
</style>
