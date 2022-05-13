<template>
  <v-container class="fill-height background justify-center" fluid>
    <v-card class="card" elevation="24">
      <v-stepper class="stepper secondary" v-model="currentStep" elevation="0">
        <v-stepper-items>
          <v-stepper-content step="1" class="pa-0">
            <h1 class="cardTitle mb-5"> Agrega una Nueva Rutina </h1>
            <!--
            <v-row>
              <v-col md="6">
                <h3> Dispositivos </h3>
              </v-col>
              <v-col md="6">
                <h3 class="pr-16"> Acciones </h3>
              </v-col>
            </v-row>
            -->
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
            <input type="text"
                   class="deviceNameBox rounded"
                   placeholder="Nueva rutina"
                   v-model="newRoutineName"
            />
            <v-btn class="nextButton v-size--x-large accent black--text"
                   :disabled="newRoutineName == null"
                   @click="save"> Siguiente </v-btn>
            <v-btn class="ms-5 v-size--x-large grey black--text"
                   @click="currentStep = 1"> Atrás </v-btn>
          </v-stepper-content>
          <v-stepper-content step="3" class="pa-0">
            <h1 class="cardTitle"> ¡Todo Listo! </h1>
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
import { mapActions, mapState } from 'vuex'

export default {
  name: 'AddNewRoutineView',
  components: { RoutineStep },
  data () {
    return {
      currentStep: 1,
      deviceIndex: 1,
      steps: [{}],
      newRoutineName: null
    }
  },
  computed: {
    ...mapState('routines', {
      routines: (state) => state.routines
    }),
    ...mapState('devices', {
      devices: (state) => state.devices
    })
  },
  methods: {
    ...mapActions('routines', {
      $createRoutine: 'create',
      // $modifyRoutine: 'modify',
      // $deleteDevice: 'delete',
      // $getDevice: 'get',
      $getAllRoutines: 'getAll'
    }),
    ...mapActions('devices', {
      $getAllDevices: 'getAll'
    }),
    updateRoutine (step) {
      this.steps[step.id] = ({ device: step.device, action: step.action })
    },
    removeLast () {
      this.steps.pop()
      this.deviceIndex--
    },
    save () {
      /*
      devicesIDs = []
      for (const step in this.steps) {
        const id = devices.find(device => {
          device.id === step.device.id
        })
        devicesIDS.append(id)
      }
      */
      this.$createRoutine({
        name: this.newRoutineName,
        actions: [

        ]
      })
      this.currentStep = 3 // Al haberlo agregado...
    },
    setResult (result) {
      this.result = JSON.stringify(result, null, 2)
    }
  },
  async created () {
    await this.$getAllRoutines()
    await this.$getAllDevices()
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
.icon{
  vertical-align: center;
}
.fila{
  max-height: 70px;
}
</style>
