<template>
  <v-container class="fill-height" fluid>
    <v-main class="fill-height accent mx-2">
      <v-sheet class="fill-height" elevation="24">
        <v-container class="secondary fill-height" fluid>
          <v-row>
            <v-col md="2"></v-col>
            <v-col md="8">
              <v-container class="niceWidth"><!-- Container para centrar contenido -->
                <h1>Mis rutinas</h1>
                <form action="">
                  <div class="d-flex">
                    <v-text-field v-model="device" :rules="deviceRules" :counter="18" placeholder="Buscar dispositivo" solo required outlined clearable></v-text-field>
                    <v-btn class="mx-2" fab dark medium color="primary">
                      <v-icon dark>
                        mdi-magnify
                      </v-icon>
                    </v-btn>
                  </div>
                </form>
                <v-content mt="10">
                  <div class="devicesParent">
                    <v-sheet class="deviceCard" v-for="routine in routines" :key="routine.id">
                      <router-link :to="{ name: 'routineDetails', params: {id: routine.id}}" class="routineName">
                        <v-icon class="mb-2">{{ routine.iconName }}</v-icon>
                        <h4>{{ routine.name }}</h4>
                      </router-link>
                    </v-sheet>
                    <v-container class="deviceCard">
                      <router-link to="new_routine">
                      <v-btn class="mx-2" large fab dark color="#FF8A65">
                        <v-icon dark>
                          mdi-plus
                        </v-icon>
                      </v-btn>
                    </router-link>
                    </v-container>
                  </div>
                </v-content>
              </v-container>
            </v-col>
            <v-col md="2"></v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </v-main>
  </v-container>
</template>

<script>
import store from '@/store/store'

export default {
  name: 'MyRoutines',
  components: { },
  data () {
    return {
      routines: store.routines,
      valid: true,
      device: '',
      deviceRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters'
      ],
      methods: {
        validate () {
          this.$refs.form.validate()
        }
      }
    }
  }
}
</script>

<style scoped>

.devicesParent {
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-self: stretch;
}

.deviceCard {
  margin: 10px;
  border-radius: 20px;
  min-width: 100px;
  min-height: 100px;
  max-width: 100px;
  max-height: 140px;
  padding-top: 20px;
}
.routineName{
  text-decoration: none;
  font-size: 1.5vw;
}
</style>
