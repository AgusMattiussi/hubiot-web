<template>
  <v-container class="fill-height background justify-center" fluid>
    <v-card class="card" elevation="24">
      <v-stepper class="stepper secondary" v-model="currentStep" elevation="0">
        <v-stepper-items>
          <v-stepper-content step="1" class="pa-0">
            <h1 class="cardTitle"> Agrega una Nueva Rutina </h1>
            <v-row>
              <v-col md="6">
                <v-autocomplete
                  height="10px"
                  class="autocomplete pa-2"
                  :items="devices"
                  placeholder="Seleccionar dispositivo"
                  rounded
                  solo
                  item-text="name"
                  auto-select-first
                  return-object
                  hide-no-data
                  v-model="selectedDevice"
                >
                </v-autocomplete>
              </v-col>
              <v-col md="6">
                <v-autocomplete
                  height="10px"
                  class="autocomplete pa-2"
                  :items="selectedDevice.actions"
                  :disabled="selectedDevice.id == null"
                  placeholder="Seleccionar acción"
                  rounded
                  solo
                  item-text="name"
                  auto-select-first
                  return-object
                  hide-no-data
                  v-model="selectedAction"
                >
                </v-autocomplete>
              </v-col>
            </v-row>
            <div>
              <v-btn class="nextButton v-size--small contras black--text">
                Añadir acción
              </v-btn>
            </div>
            <v-btn class="nextButton v-size--x-large accent black--text"
                   :disabled="selectedDevice.id == null"
                   @click="currentStep = 2"> Siguiente </v-btn>
            <router-link class="text-decoration-none" to="routines">
              <v-btn class="ma-5 v-size--x-large grey black--text"> Cancelar </v-btn>
            </router-link>
          </v-stepper-content>
          <v-stepper-content step="2" class="pa-0">
            <h1 class="cardTitle"> Nombre de la rutina </h1>
            <h2 class="mt-6"> ¿Cómo se llamará la nueva rutina?</h2>
            <input type="text"
                   class="deviceNameBox rounded"
                   placeholder="Nueva rutina"
                   v-model="newRoutineName"
            />
            <v-btn class="nextButton v-size--x-large accent black--text"
                   :disabled="newRoutineName == null"
                   @click="currentStep = 3"> Siguiente </v-btn>
            <v-btn class="ms-5 v-size--x-large grey black--text"
                   @click="currentStep = 1"> Atrás </v-btn>
          </v-stepper-content>
          <v-stepper-content step="3" class="pa-0">
            <h1 class="cardTitle"> ¡Todo Listo! </h1>
            <h2 class="pa-6"> La rutina "{{newRoutineName}}" fue creado con éxito</h2>
            <v-icon color="success" class="checkIcon d-block" size="150px">mdi-check-circle</v-icon>
            <router-link class="text-decoration-none" to="routines">
              <v-btn class="ma-5 v-size--x-large accent black--text"> Volver a "Mis Rutinas" </v-btn>
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
  name: 'AddNewRoutineView',
  data () {
    return {
      currentStep: 1,
      devices: store.devices,
      selectedDevice: {},
      selectedAction: {},
      newRoutineName: null
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
  background-color: #E8EAF6;
  border-radius: 20px;
  margin: auto;
  width: 500px;
}
.cardTitle{
  height: 70px;
  padding: 10px;
  border-radius: 0;
  background-color: #5C6BC0;
  color: #FFFFFF;
  margin: 0;
}
.autocomplete{
  width: 400px;
  margin: 20px auto;
}
.deviceNameBox{
  background-color: #FFFFFF;
  outline-color: #5C6BC0;
  margin: 20px auto;
  padding: 8px;
  width: 400px;
  display: block;
}
.nextButton{
  margin: 20px auto;
}
.stepper{
  width: 600px;
}
.checkIcon{
  height: auto;
  margin: 20px auto;
}
</style>
