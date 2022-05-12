<template>
  <v-container class="fill-height background justify-center" fluid>
    <v-card class="card" elevation="24">
      <v-stepper class="stepper secondary" v-model="currentStep" elevation="0">
        <v-stepper-items>
          <v-stepper-content step="1" class="pa-0">
            <h1 class="cardTitle mb-5"> Agrega una Nueva Rutina </h1>
              <RoutineStep v-for="i in deviceIndex" :key="i-1" :id="i-1" @updatedStep="updateRoutine"/>
            <div>
              <v-btn class="nextButton v-size--small contras black--text"
              @click="deviceIndex++">
                Añadir Paso
              </v-btn>
            </div>
            <v-btn class="nextButton v-size--x-large accent black--text"
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
import RoutineStep from '@/components/RoutineStep'

export default {
  name: 'AddNewRoutineView',
  components: { RoutineStep },
  data () {
    return {
      currentStep: 1,
      deviceIndex: 1,
      devices: store.devices,
      steps: [{}],
      newRoutineName: null
    }
  },
  methods: {
    updateRoutine (step) {
      this.steps[step.id] = ({ device: step.device, action: step.action })
      console.log(step.id.toString())
      console.log(step.device)
      console.log(step.action)
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
