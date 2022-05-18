<template>
  <v-container class="fill-height container">
    <img v-if="loading"
         :src="require('@/assets/ajax-loader.gif')"
         alt="loading">
    <div v-else class="actions">
      <div  v-if="alarm.status === 'disarmed'">
          <div class="inputAction">
            <v-text-field type="text"
                   :rules="[isCodeValid(stayCode, 'Debe ser un número entre 0000 y 9999')]"
                   class="textBox rounded"
                   placeholder="Código"
                   v-model="stayCode"
            />
            <v-btn class="btn" @click="armStay" :disabled="!isCodeValid(stayCode, null)">
              Monitoreo pasivo
            </v-btn>
          </div>
          <div class="inputAction">
            <v-text-field type="text"
                   class="textBox rounded"
                   placeholder="Código"
                   v-model="awayCode"
            />
            <v-btn class="btn" @click="armAway" :disabled="!isCodeValid(awayCode, null)">
              Habilitar
            </v-btn>
          </div>
      </div>
      <div v-else>
        <div v-if="alarm.status === 'armedAway'" class="inputAction">
          <v-text-field type="text"
                        :rules="[isCodeValid(stayCode, 'Debe ser un número entre 0000 y 9999')]"
                        class="textBox rounded"
                        placeholder="Código"
                        v-model="stayCode"
          />
          <v-btn class="btn" @click="armStay" :disabled="!isCodeValid(stayCode, null)" >
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
          <v-btn class="btn" @click="armAway" :disabled="!isCodeValid(awayCode, null)">
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
          <v-btn class="btn" @click="disarm" :disabled="!isCodeValid(disableCode, null)">
            Deshabilitar
          </v-btn>
        </div>
      </div>
      <div>
        <div class="inputAction">
          <v-text-field type="text"
                        :rules="[isCodeValid(oldCode, true)]"
                        class="textBox rounded"
                        placeholder="Viejo"
                        v-model="oldCode"
          />
          <v-text-field type="text"
                        :rules="[isCodeValid(newCode, true)]"
                        class="textBox rounded"
                        placeholder="Nuevo"
                        v-model="newCode"
          />
          <v-btn class="btn" @click="changeCode" :disabled="!isCodeValid(oldCode, null) || !isCodeValid(newCode, null)">
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
    isCodeValid (code, withMsg) {
      const msg = 'Debe ser un número entre 0000 y 9999'
      if (code >= 0 && code < 10000) {
        return true
      }
      return withMsg ? msg : false
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
.container{
  margin: 0;
  padding: 0;
}
.actions{
  justify-content: space-between;
  margin: auto;
}
.inputAction{
  display: flex;
  justify-content: space-between;
}
.textBox{
  outline-color: #5C6BC0;
  padding: 8px;
  width: 65px;
  display: block;
}
.btn{
  background-color: #FF8A65 !important;
  border-radius: 100px;
  border: 2px solid black;
  margin-left: 10px;
  height: 40px;
  width: 180px;
}
</style>
