<template>
  <v-container @click="getAcState" class="fill-height pa-0 ma-0">
    <img v-if="loading"
         :src="require('@/assets/ajax-loader.gif')"
         alt="loading">
    <div v-else class="actions">
      <div class="actions">
        <div v-if="ac.status === 'off'" class="action">
          <button class="btn" @click="turnOn">
            <v-icon class="mx-auto" color="black">
              mdi-lightning-bolt-circle
            </v-icon>
          </button>
        </div>
        <div v-else class="action">
          <button class="btn" @click="turnOff">
            <v-icon class="mx-auto" color="black">
              mdi-minus-circle-off-outline
            </v-icon>
          </button>
        </div>
        <div class="inputAction">
          <input type="text"
                 class="textBox rounded"
                 placeholder="°C"
                 v-model="temperature"
          />
          <button class="btn2" @click="setTemperature">
            Modificar Temperatura
          </button>
        </div>
        <div class="inputAction">
          <input type="text"
                 class="textBox2 rounded"
                 placeholder="Modo"
                 v-model="mode"
          />
          <button class="btn2" @click="setMode">
            Modificar Modo
          </button>
        </div>
      </div>
      <div class="inputAction">
        <input type="text"
               class="textBox2 rounded"
               placeholder="Modo"
               v-model="verticalSwing"
        />
        <button class="btn2" @click="setVerticalSwing">
          Modificar Vertical
        </button>
      </div>
      <div class="inputAction">
        <input type="text"
               class="textBox2 rounded"
               placeholder="Modo"
               v-model="horizontalSwing"
        />
        <button class="btn2" @click="setHorizontalSwing">
          Modificar Horizontal
        </button>
      </div>
      <div class="inputAction">
        <input type="text"
               class="textBox2 rounded"
               placeholder="Modo"
               v-model="fanSpeed"
        />
        <button class="btn2" @click="setFanSpeed">
          Modificar velocidad
        </button>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'AcActions',
  props: {
    deviceId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      ac: null,
      loading: false,
      temperature: null,
      mode: null,
      verticalSwing: null,
      horizontalSwing: null,
      fanSpeed: null
    }
  },
  computed: {
    ...mapState('devices', {
      devices: (state) => state.devices
    })
  },
  methods: {
    ...mapActions('devices', {
      $getAcState: 'getState',
      $executeAction: 'execute'
    }),
    async getAcState () {
      try {
        this.ac = await this.$getAcState(this.deviceId)
      } catch (e) {
        // this.setResult(e)
        console.log('getAcStateError')
      }
    }
  },
  async created () {
    this.loading = true
    await this.getAcState()
      // eslint-disable-next-line no-return-assign
      .then(() => this.loading = false)
  }
}
</script>

<style scoped>
.actions{
  justify-content: space-between;
}
.action{
  margin-right: 100px;
}
.btn{
  background-color: #FF8A65;
  border-radius: 100px;
  border: 2px solid black;
  margin-bottom: 10px;
  height: 40px;
  width: 40px;
}
.inputAction{
  display: flex;
  justify-content: space-between;
}
.textBox{
  background-color: #FFFFFF;
  outline-color: #5C6BC0;
  border: 2px solid black;
  margin: 0 0 20px 0;
  padding: 8px;
  width: 50px;
  display: block;
}
.textBox2{
  background-color: #FFFFFF;
  outline-color: #5C6BC0;
  border: 2px solid black;
  margin: 0 0 20px 0;
  padding: 8px;
  width: 100px;
  display: block;
}
.btn2{
  background-color: #FF8A65;
  border-radius: 100px;
  border: 2px solid black;
  margin-left: 10px;
  padding: 5px;
  height: 40px;
  width: fit-content;
}
</style>
