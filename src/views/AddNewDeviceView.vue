<template>
<v-container class="fill-height background justify-center" fluid>
  <v-card class="card" elevation="24">
    <v-stepper class="stepper secondary" v-model="currentStep" elevation="0">
      <v-stepper-items>
        <v-stepper-content step="1" class="pa-0">
          <h1 class="cardTitle"> Tipo de Dispositivo </h1>
          <h2 class="mt-6"> ¿Qué tipo de dispositivo es?</h2>
          <v-autocomplete
            height="10px"
            class="autocomplete pa-2"
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
          <v-btn class="nextButton v-size--x-large accent black--text"
                 :disabled="newDevice.id == null"
                 @click="currentStep = 2"> Siguiente </v-btn>
          <router-link class="text-decoration-none" to="devices">
            <v-btn class="ma-5 v-size--x-large grey black--text"> Cancelar </v-btn>
          </router-link>
        </v-stepper-content>
        <v-stepper-content step="2" class="pa-0">
          <h1 class="cardTitle"> Nombre del Dispositivo </h1>
          <h2 class="mt-6"> ¿Cómo se llamará el nuevo dispositivo?</h2>
          <input type="text"
                 class="deviceNameBox rounded"
                 placeholder="Nuevo Dispositivo"
                 v-model="newDeviceName"
          />
          <img class="deviceImage" :src="require(`@/assets/${newDevice.name != null? newDevice.image : 'logo.png'}`)" :alt="newDevice.name">
          <v-btn class="nextButton v-size--x-large accent black--text"
                 :disabled="newDeviceName == null"
                 @click="currentStep = 3"> Siguiente </v-btn>
          <v-btn class="ms-5 v-size--x-large grey black--text"
                 @click="currentStep = 1"> Atrás </v-btn>
        </v-stepper-content>
        <v-stepper-content step="3" class="pa-0">
          <h1 class="cardTitle"> ¡Todo Listo! </h1>
          <h2 class="pa-6"> El dispostivo "{{newDeviceName}}" fue creado con éxito</h2>
          <v-icon color="success" class="checkIcon d-block" size="150px">mdi-check-circle</v-icon>
          <router-link class="text-decoration-none" to="devices">
            <v-btn class="ma-5 v-size--x-large accent black--text"> Volver a "Mis Dispositivos" </v-btn>
          </router-link>
        </v-stepper-content>
      </v-stepper-items>
      <v-stepper-header class="elevation-0 white">
        <v-stepper-step :color="currentStep === 1? 'primary' : 'success'" class="ml-16" :complete="currentStep > 1" step="1"></v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :color="currentStep === 2? 'primary' : 'success'" :complete="currentStep > 2" step="2"></v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :completed="true" :color="currentStep === 3? 'success' : 'grey'" class="mr-16" step="3"></v-stepper-step>
      </v-stepper-header>
    </v-stepper>
  </v-card>
</v-container>
</template>

<script>
import store from '@/store/store'

export default {
  name: 'AddNewDeviceView.vue',
  data () {
    return {
      currentStep: 1,
      devices: store.devices,
      newDevice: {},
      newDeviceName: null
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
    elevation: 24deg;
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
  .deviceNameBox{
    background-color: #FFFFFF;
    outline-color: #5C6BC0;
    margin: 20px auto;
    padding: 8px;
    width: 400px;
    display: block;
  }
  .deviceImage{
    max-width: 200px;
    height: auto;
    display: block;
    margin: 30px auto;
    border-radius: 50% !important;
    background-color: #FFFFFF;
    border: 1px solid #5C6BC0;
  }
  .nextButton{
    margin: 20px auto;
  }
  .stepper{
    width: 600px;
  }
  .autocomplete{
    width: 400px;
    margin: 20px auto;
  }
  .checkIcon{
    height: auto;
    margin: 20px auto;
  }
</style>
