<template>
  <v-container @click="getAlarmState" class="fill-height pa-0 ma-0">
    <img v-if="loading"
         :src="require('@/assets/ajax-loader.gif')"
         alt="loading">
    <div v-else class="actions">
      <div  v-if="alarm.status === 'disarmed'" class="action">
          <div class="inputAction">
            <v-text-field type="text"
                   :rules="[isCodeValid(stayCode, 'Debe ser un número entre 0000 y 9999')]"
                   class="textBox rounded"
                   placeholder="Código"
                   v-model="stayCode"
            />
            <v-btn class="btn2" @click="armStay" :disabled="!isCodeValid(stayCode, null)" >
              Monitoreo pasivo
            </v-btn>
          </div>
          <div class="inputAction">
            <v-text-field type="text"
                   class="textBox rounded"
                   placeholder="Código"
                   v-model="awayCode"
            />
            <v-btn class="btn2" @click="armAway" :disabled="!isCodeValid(awayCode, null)">
              Habilitar
            </v-btn>
          </div>
      </div>
      <div v-else class="action">
        <div v-if="alarm.status === 'armedAway'" class="inputAction">
          <v-text-field type="text"
                        :rules="[isCodeValid(stayCode, 'Debe ser un número entre 0000 y 9999')]"
                        class="textBox rounded"
                        placeholder="Código"
                        v-model="stayCode"
          />
          <v-btn class="btn2" @click="armStay" :disabled="!isCodeValid(stayCode, null)" >
            Monitoreo pasivo
          </v-btn>
        </div>
        <div v-if="alarm.status === 'armedStay'" class="inputAction">
          <v-text-field type="text"
                        :rules="[isCodeValid(awayCode, 'Debe ser un número entre 0000 y 9999')]"
                        class="textBox rounded"
                        placeholder="Código"
                        v-model="awayCode"
          />
          <v-btn class="btn2" @click="armAway" :disabled="!isCodeValid(awayCode, null)">
            Habilitar
          </v-btn>
        </div>
        <div class="inputAction">
          <v-text-field type="text"
                        :rules="[isCodeValid(disableCode, 'Debe ser un número entre 0000 y 9999')]"
                        class="textBox rounded"
                        placeholder="Código"
                        v-model="disableCode"
          />
          <v-btn class="btn2" @click="disarm" :disabled="!isCodeValid(disableCode, null)">
            Deshabilitar
          </v-btn>
        </div>
      </div>
      <div class="action">
        <div class="inputAction">
          <v-text-field type="text"
                        :rules="[isCodeValid(oldCode, 'Debe ser un número entre 0000 y 9999')]"
                        class="textBox2 rounded"
                        placeholder="Viejo"
                        v-model="oldCode"
          />
          <v-text-field type="text"
                        :rules="[isCodeValid(newCode, 'Debe ser un número entre 0000 y 9999')]"
                        class="textBox2 rounded"
                        placeholder="Nuevo"
                        v-model="newCode"
          />
          <v-btn class="btn2" @click="changeCode" :disabled="!isCodeValid(oldCode, null) || !isCodeValid(newCode, null)">
            Cambiar código
          </v-btn>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
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
      stayCode: null,
      awayCode: null,
      disableCode: null,
      oldCode: null,
      newCode: null
    }
  },
  methods: {
    ...mapActions('devices', {
      $getAlarmState: 'getState',
      $executeAction: 'execute'
    }),
    stateUpdated () {
      this.$root.$emit('alarmStateUpdated')
    },
    async getAlarmState () {
      try {
        this.alarm = await this.$getAlarmState(this.deviceId)
      } catch (e) {
        // this.setResult(e)
        console.log('getAlarmStateError')
      }
    },
    async executeAction (action) {
      try {
        await this.$executeAction({ deviceId: this.deviceId, action })
        await this.getAlarmState()
        this.stateUpdated()
      } catch (e) {
        console.log('Error en ' + action.name)
      }
    },
    isCodeValid (code, msg) {
      if (code >= 0 && code < 10000) {
        return true
      }
      return msg == null ? false : msg
    },
    async armStay () {
      const action = {
        name: 'armStay',
        data: [this.stayCode]
      }
      await this.executeAction(action)
    },
    async armAway () {
      const action = {
        name: 'armAway',
        data: [this.awayCode]
      }
      await this.executeAction(action)
    },
    async disarm () {
      const action = {
        name: 'disarm',
        data: [this.disableCode]
      }
      await this.executeAction(action)
    },
    async changeCode () {
      const action = {
        name: 'changeSecurityCode',
        data: [this.oldCode, this.newCode]
      }
      await this.executeAction(action)
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
  justify-content: space-between;
}
.action{
  margin-right: 100px;
}
.inputAction{
  display: flex;
  justify-content: space-between;
}
.textBox{
  outline-color: #5C6BC0;
  padding: 8px;
  width: 50px !important;
  display: block;
}
.textBox2{
  outline-color: #5C6BC0;
  padding: 8px;
  width: 65px;
  display: block;
}
.btn2{
  background-color: #FF8A65 !important;
  border-radius: 100px;
  border: 2px solid black;
  margin-left: 10px;
  height: 40px;
  width: 180px;
}
</style>
