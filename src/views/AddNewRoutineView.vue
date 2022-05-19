<template>
  <v-main class="fill-height background justify-center" fluid>
    <v-container>
      <v-card class="card" elevation="24">
      <v-stepper class="stepper" v-model="currentStep" elevation="0">
        <v-stepper-items>
          <v-stepper-content step="1" class="stepperContent">
            <h1 class="cardTitle"> Agrega una Nueva Rutina </h1>
            <v-row class="fila" v-for="i in deviceIndex" :key="i-1">
              <v-col md="11">
                <RoutineStep :id="i-1" @updatedStep="updateRoutine"/>
              </v-col>
              <v-col md="1">
                <v-container class="fill-height justify-center removeStep" >
                  <v-icon v-if="i===deviceIndex && i!==1" class="icon" @click="removeLast">
                    mdi-close
                  </v-icon>
                </v-container>
              </v-col>
            </v-row>
            <div class="mt-5">
              <v-btn class="newStepBtn"
              @click="deviceIndex++">
                Añadir Paso
              </v-btn>
            </div>
            <v-btn class="nextButton"
                   @click="currentStep = 2"> Siguiente </v-btn>
            <router-link class="text-decoration-none" to="routines">
              <v-btn class="cancelButton"> Cancelar </v-btn>
            </router-link>
          </v-stepper-content>
          <v-stepper-content step="2" class="stepperContent">
            <h1 class="cardTitle"> Nombre de la rutina </h1>
            <h2 class="subtitle"> ¿Cómo se llamará la nueva rutina?</h2>
            <form ref="form">
              <v-text-field class="textBox"
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
              <v-btn class="nextButton"
                     :disabled="!isNameValid(newRoutineName)"
                     @click="createRoutine"> Siguiente </v-btn>
              <v-btn class="cancelButton"
                     @click="currentStep = 1"> Atrás </v-btn>
            </form>
          </v-stepper-content>
          <v-stepper-content step="3" class="stepperContent">
            <h1 class="cardTitle">¡Todo Listo!</h1>
            <h2 class="successMsg"> La rutina "{{newRoutineName}}" fue creada con éxito</h2>
            <v-icon color="success" class="checkIcon" size="150px">mdi-check-circle</v-icon>
            <router-link class="lastButton" to="routines">
              <v-btn class="nextButton"> Volver a "Mis Rutinas" </v-btn>
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
  </v-main>
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
          params: [step.action.params], // Acá irían los métodos obtenidos del step.
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
.textBox{
  width: 400px;
  margin: 20px auto;
}

.card{
  margin-left: auto;
  margin-right: auto;
  background-color: #E8EAF6;
  border-radius: 20px;
  width: 70%;
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
.newStepBtn{
  margin: 20px auto;
  color: black;
  background-color: #FF8A65 !important;
  font-size: 16px;
  height: 40px !important;
  width: fit-content;
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
  margin-top: 10%;
  margin-left: auto;
  margin-right: auto;
}
.stepperContent{
  padding: 0;
}
.checkIcon{
  display: block;
  height: auto;
  margin: 20px auto;
}
.icon{
  vertical-align: center;
}
.fila{
  max-height: 70px;
}
.removeStep{
  padding: 0 16px 0 0;
}
.successMsg{
  padding: 6px;
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
.lastButton{
  text-decoration: none;
}
</style>
