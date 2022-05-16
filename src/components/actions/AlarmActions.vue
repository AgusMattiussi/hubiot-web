<template>
  <v-container @click="getAlarmState" class="fill-height pa-0 ma-0">
    <img v-if="loading"
         :src="require('@/assets/ajax-loader.gif')"
         alt="loading">
    <div v-else class="actions">
      <div class="action">
        <div class="inputAction">
          <input type="text"
                 class="textBox rounded"
                 placeholder="Código"
                 v-model="code"
          />
          <button class="btn2" @click="changeCode">
            Cambiar código
          </button>
        </div>
        <div class="inputAction">
          <input type="text"
                 class="textBox rounded"
                 placeholder="Código"
                 v-model="code"
          />
          <button class="btn2" @click="armStay">
            ArmStay
          </button>
        </div>
        <div class="inputAction">
          <input type="text"
                 class="textBox rounded"
                 placeholder="Código"
                 v-model="code"
          />
          <button class="btn2" @click="armAway">
            ArmAway
          </button>
        </div>
        <div class="inputAction">
          <input type="text"
                 class="textBox rounded"
                 placeholder="Código"
                 v-model="code"
          />
          <button class="btn2" @click="disarm">
            Disarm
          </button>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'AlarmActions',
  props: {
    deviceId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      alarm: null,
      loading: false,
      code: null
    }
  },
  computed: {
    ...mapState('devices', {
      devices: (state) => state.devices
    })
  },
  methods: {
    ...mapActions('devices', {
      $getAlarmState: 'getState',
      $executeAction: 'execute'
    }),
    async getAlarmState () {
      try {
        this.alarm = await this.$getAlarmState(this.deviceId)
      } catch (e) {
        // this.setResult(e)
        console.log('getAlarmStateError')
      }
    }
  },
  async created () {
    this.loading = true
    await this.getAlarmState()
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
.inputAction{
  display: flex;
  justify-content: space-between;
}
.textBox{
  background-color: #FFFFFF;
  outline-color: #5C6BC0;
  border: 2px solid black;
  margin: 0 auto 40px;
  padding: 8px;
  width: 80px;
  display: block;
}
.btn2{
  background-color: #FF8A65;
  border-radius: 100px;
  border: 2px solid black;
  margin-left: 10px;
  height: 40px;
  width: 150px;
}
</style>
