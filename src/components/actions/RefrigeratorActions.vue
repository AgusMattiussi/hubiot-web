<template>
  <v-container @click="getRefrigeratorState" class="fill-height pa-0 ma-0">
    <img v-if="loading"
         :src="require('@/assets/ajax-loader.gif')"
         alt="loading">
    <div v-else class="actions">
      <div class="inputAction">
        <input type="text"
               class="textBox rounded"
               placeholder="Temperatura freezer"
               v-model="freezerTemp"
        />
        <button class="btn" @click="setFreezerTemperature">
          Modificar temperatura freezer
        </button>
      </div>
      <div class="inputAction">
        <input type="text"
               class="textBox rounded"
               placeholder="Temperatura heladera"
               v-model="temperature"
        />
        <button class="btn" @click="setTemperature">
          Modificar temperatura
        </button>
      </div>
      <div class="inputAction">
        <input type="text"
               class="textBox rounded"
               placeholder="Modo"
               v-model="mode"
        />
        <button class="btn" @click="setMode">
          Modificar modo
        </button>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'RefrigeratorActions',
  props: {
    deviceId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      refrigerator: null,
      freezerTemp: null,
      temperature: null,
      mode: null,
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
      $getRefrigeratorState: 'getState',
      $executeAction: 'execute'
    }),
    async getRefrigeratorState () {
      try {
        this.refrigerator = await this.$getRefrigeratorState(this.deviceId)
      } catch (e) {
        // this.setResult(e)
        console.log('getRefrigeratorStateError')
      }
    },
    async setFreezerTemperature () {
      const action = {
        name: 'setFreezerTemperature',
        data: [this.freezerTemp]
      }
      try {
        await this.$executeAction(this.deviceId, action)
        await this.getRefrigeratorState()
      } catch (e) {
        // this.setResult(e)
        console.log('closeError')
      }
    },
    async setTemperature () {
      const action = {
        name: 'setTemperature',
        data: [this.temperature]
      }
      try {
        await this.$executeAction(this.deviceId, action)
        await this.getRefrigeratorState()
      } catch (e) {
        // this.setResult(e)
        console.log('closeError')
      }
    },
    async setMode () {
      const action = {
        name: 'setMode',
        data: [this.mode]
      }
      try {
        await this.$executeAction(this.deviceId, action)
        await this.getRefrigeratorState()
      } catch (e) {
        // this.setResult(e)
        console.log('closeError')
      }
    }
  },
  async created () {
    this.loading = true
    await this.getRefrigeratorState()
      // eslint-disable-next-line no-return-assign
      .then(() => this.loading = false)
  }
}
</script>

<style scoped>
.actions{
  display: inline-block;
}
.inputAction{
  display: flex;
  justify-content: space-between;
}
.btn{
  background-color: #FF8A65;
  border-radius: 100px;
  border: 2px solid black;
  padding: 5px;
  margin-left: 10px;
  height: 40px;
  width: fit-content;
}
.textBox{
  background-color: #FFFFFF;
  outline-color: #5C6BC0;
  border: 2px solid black;
  margin: 0 0 20px 0;
  padding: 8px;
  width: fit-content;
  display: block;
}
</style>
