<template>
  <v-container class="fill-height background justify-center" fluid>
    <v-card class="card" elevation="24">
      <v-stepper class="stepper secondary" v-model="currentStep" elevation="0">
        <v-stepper-items>
          <v-stepper-content step="1" class="pa-0">
            <h1 class="cardTitle mb-5"> Agrega una Nueva Rutina </h1>
            <v-row class="fila" v-for="i in deviceIndex" :key="i-1">
              <v-col md="11">
                <RoutineStep :id="i-1" @updatedStep="updateRoutine"/>
              </v-col>
              <v-col md="1">
                <v-container class="fill-height justify-center pl-0 pt-0 pb-0 pr-8" >
                  <v-icon v-if="i===deviceIndex && i!==1" class="icon" @click="removeLast">
                    mdi-close
                  </v-icon>
                </v-container>
              </v-col>
            </v-row>
            <div class="mt-5">
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
            <form ref="form">
              <v-text-field class="autocomplete pa-2"
                            height="10px"
                            v-model="newRoutineName"
                            :counter="this.maxLength"
                            placeholder="Nueva rutina"
                            :rules="[isNameValid(newRoutineName, true)]"
                            solo
                            rounded
                            required
                            outlined
                            clearable
                            @click:clear="newRoutineName = ''"/>
              <v-btn class="nextButton v-size--x-large accent black--text"
                     :disabled="!isNameValid(newRoutineName)"
                     @click="createRoutine"> Siguiente </v-btn>
              <v-btn class="ms-5 v-size--x-large grey black--text"
                     @click="currentStep = 1"> Atrás </v-btn>
            </form>
          </v-stepper-content>
          <v-stepper-content step="3" class="pa-0">
            <h1 class="cardTitle">¡Todo Listo!</h1>
            <h2 class="pa-6"> La rutina "{{newRoutineName}}" fue creada con éxito</h2>
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
import RoutineStep from '@/components/RoutineStep'
import { mapActions } from 'vuex'
import { Routine } from '@/api/routinesApi'

export default {
  name: 'AddNewRoutineView',
  components: { RoutineStep },
  data () {
    return {
      currentStep: 1,
      deviceIndex: 1,
      steps: [{}],
      newRoutineName: '',
      result: null,
      routine: null,
      maxLength: 12
    }
  },
  methods: {
    ...mapActions('routines', {
      $createRoutine: 'create'
    }),
    isNameValid (name, withMsg) {
      const msg = 'El nombre debe tener entre 3 y ' + this.maxLength.toString() + ' caracteres'
      if (name.length >= 3 && name.length <= this.maxLength) {
        return true
      }
      return withMsg ? msg : false
    },
    setResult (result) {
      this.result = JSON.stringify(result, null, 2)
    },
    updateRoutine (step) {
      this.steps[step.id] = ({ device: step.device, action: step.action })
    },
    removeLast () {
      this.steps.pop()
      this.deviceIndex--
    },
    async createRoutine () {
      const actions = this.steps.map((step) => {
        return {
          device: {
            id: step.device.id
          },
          actionName: step.action.name,
          params: [], // Acá irían los métodos obtenidos del step.
          meta: {}
        }
      })
      const routine = new Routine(this.newRoutineName, actions, {})
      try {
        this.routine = await this.$createRoutine(routine)
        this.routine = Object.assign(new Routine(), this.routine)
        console.log(this.routine)
        this.setResult(this.routine)
        this.currentStep = 3 // Al haberlo agregado...
      } catch (e) {
        console.log('error' + this.e)
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
.autocomplete{
  width: 400px;
  margin: 20px auto;
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
.icon{
  vertical-align: center;
}
.fila{
  max-height: 70px;
}
</style>
