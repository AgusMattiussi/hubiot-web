<template>
<v-container class="fill-height background justify-center" fluid>
  <v-card class="card" elevation="24">
    <v-stepper class="stepper" v-model="currentStep" elevation="0">
      <v-stepper-items>
        <v-stepper-content step="1" class="stepperContent">
          <h1 class="cardTitle"> Tipo de Dispositivo </h1>
          <h2 class="subtitle"> ¿Qué tipo de dispositivo es?</h2>
          <v-autocomplete
            height="10px"
            class="autocomplete"
            :items="devices"
            placeholder="Seleccionar"
            rounded
            solo
            item-text="name"
            auto-select-first
            return-object
            hide-no-data
            v-model="newDevice"
          >
          </v-autocomplete>
          <v-btn class="nextButton"
                 :disabled="newDevice.id == null"
                 @click="currentStep = 2">Siguiente</v-btn>
          <router-link class="button" to="devices">
            <v-btn class="cancelButton">Cancelar</v-btn>
          </router-link>
        </v-stepper-content>
        <v-stepper-content step="2" class="stepperContent">
          <h1 class="cardTitle"> Nombre del Dispositivo </h1>
          <h2 class="subtitle"> ¿Cómo se llamará el nuevo dispositivo?</h2>
          <v-text-field class="autocomplete"
                        height="10px"
                        v-model="newDeviceName"
                        :counter="12"
                        placeholder="Nuevo dispositivo"
                        solo
                        rounded
                        required
                        outlined
                        clearable/>
          <img class="deviceImage" :src="require(`@/assets/${newDevice.name != null? newDevice.image : 'logo.png'}`)" :alt="newDevice.name">
          <v-btn class="nextButton"
                 :disabled="newDeviceName == null"
                 @click="createDevice()"> Siguiente </v-btn>
          <v-btn class="cancelButton"
                 @click="currentStep = 1"> Atrás </v-btn>
        </v-stepper-content>
        <v-stepper-content step="3" class="stepperContent">
          <h1 class="cardTitle"> ¡Todo Listo! </h1>
          <h2 class="successMsg"> El dispostivo "{{newDeviceName}}" fue creado con éxito</h2>
          <v-icon color="success" class="checkIcon" size="150px">mdi-check-circle</v-icon>
          <router-link class="button" to="devices">
            <v-btn class="nextButton"> Volver a "Mis Dispositivos" </v-btn>
          </router-link>
        </v-stepper-content>
      </v-stepper-items>
      <v-stepper-header class="stepperHeader">
        <v-stepper-step :color="currentStep === 1? 'primary' : 'success'" class="stepCounter1" :complete="currentStep > 1" step="1"></v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :color="currentStep === 2? 'primary' : 'success'" :complete="currentStep > 2" step="2"></v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :completed="true" :color="currentStep === 3? 'success' : 'grey'" class="stepCounter2" step="3"></v-stepper-step>
      </v-stepper-header>
    </v-stepper>
  </v-card>
</v-container>
</template>

<script>
import store from '@/store/store'
import { mapActions } from 'vuex'
import { Device, DeviceMeta } from '@/api/devicesApi'

export default {
  name: 'AddNewDeviceView.vue',
  data () {
    return {
      currentStep: 1,
      devices: store.devices,
      newDevice: {},
      newDeviceName: null,
      result: null,
      device: null
    }
  },
  methods: {
    ...mapActions('devices', {
      $createDevice: 'create'
    }),
    setResult (result) {
      this.result = JSON.stringify(result, null, 2)
    },
    async createDevice () {
      const deviceMeta = new DeviceMeta(this.newDevice.image)
      const device = new Device(this.newDevice.type, this.newDeviceName, deviceMeta)
      try {
        this.device = await this.$createDevice(device)
        this.device = Object.assign(new Device(), this.device)
        this.setResult(this.device)
        this.currentStep = 3
      } catch (e) {
        this.setResult(e)
      }
    }
  }
}
</script>

<style scoped>
  .background{
    background-image: url('../assets/background_my_device.png');
    background-size: cover;
  }
  .card{
    border-radius: 20px;
    margin: auto;
    background-color: #C3CCFF;
  }
  .cardTitle{
    height: 70px;
    padding: 10px;
    border-radius: 0;
    background-color: #5C6BC0;
    color: #FFFFFF;
    margin: 0;
  }
  .subtitle{
    margin-top: 10px;
  }
  .deviceImage{
    max-width: 200px;
    height: auto;
    display: block;
    margin: 30px auto;
    border-radius: 50%;
    background-color: #FFFFFF;
    border: 1px solid #5C6BC0;
  }
  .stepperContent{
    padding: 0;
  }
  .button{
    text-decoration: none;
  }
  .nextButton{
    margin: 20px auto;
    color: black;
    background-color: #8C9EFF !important;
    font-size: 16px;
    height: 55px !important;
    width: fit-content;
  }
  .cancelButton{
    margin: 5px;
    background-color: #9E9E9E !important;
    color: black;
    font-size: 16px;
    height: 55px !important;
    width: 140px;
  }
  .stepper{
    background-color: #C5CAE9 !important;
    width: 600px;
  }
  .autocomplete{
    width: 400px;
    margin: 20px auto;
    padding: 2px;
  }
  .successMsg{
    padding: 6px;
  }
  .checkIcon{
    height: 150px;
    margin: 20px auto;
    width: 150px;
    display: block;
  }
  .stepperHeader{
    elevation: 0;
    background-color: white;
  }
  .stepCounter1{
    margin-left: 64px;
  }
  .stepCounter2{
    margin-right: 64px;
  }
</style>
