<template>
  <v-container @click="getBlindsState" class="fill-height pa-0 ma-0">
    <img v-if="loading"
         :src="require('@/assets/ajax-loader.gif')"
         alt="loading">
    <div v-else class="actions">
      <div class="action">
        <div v-if="blinds.status === 'closed'" class="action" @click="open">
          <button class="btn">
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
        <input type="text"
               class="textBox rounded"
               :placeholder="blinds.level"
               v-model="level"
        />
        <button class="btn2" @click="setLevel">
          Cambiar nivel
        </button>
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
    async getBlindsState () {
      try {
        this.blinds = await this.$getBlindsState(this.deviceId)
      } catch (e) {
        // this.setResult(e)
        console.log('getBlindStateError')
      }
    },
    async open () {
      const action = {
        name: 'open',
        data: []
      }
      try {
        await this.$executeAction(this.deviceId, action)
        await this.getBlindsState()
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
        await this.getBlindsState()
      } catch (e) {
        // this.setResult(e)
        console.log('closeError')
      }
    },
    async setLevel () {
      const action = {
        name: 'setLevel',
        data: [this.level]
      }
      try {
        await this.$executeAction(this.deviceId, action)
        await this.getBlindsState()
      } catch (e) {
        // this.setResult(e)
        console.log('closeError')
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
  background-color: #FF8A65;
  border-radius: 100px;
  border: 2px solid black;
  margin-left: 10px;
  height: 40px;
  width: 150px;
}
.textBox{
  background-color: #FFFFFF;
  outline-color: #5C6BC0;
  border: 2px solid black;
  margin: 0 auto 40px;
  padding: 8px;
  width: 58px;
  display: block;
}
</style>
