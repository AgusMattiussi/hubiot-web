<template>
  <v-container class="fill-height" fluid>
    <v-main class="fill-height accent mx-2">
      <v-sheet class="fill-height" elevation="24">
        <v-container class="secondary fill-height" fluid>
          <v-row>
            <v-col md="2"></v-col>
            <v-col md="8">
              <v-container class="niceWidth"> <!-- Container para centrar contenido -->
                <h1 class="mb-3">Mis rutinas</h1>
                <form action="">
                  <div class="d-flex">
                    <v-text-field v-model="routine"
                                  :counter="18"
                                  :append-icon="'mdi-magnify'"
                                  @click:append="searchedClicked"
                                  placeholder="Buscar dispositivo"
                                  solo
                                  required
                                  outlined
                                  clearable/>
                    <router-link to="new_routine">
                      <AddButton class="addButton"/>
                    </router-link>
                  </div>
                </form>
                <v-main mt="10">
                  <div class="devicesParent">
                    <v-sheet class="deviceCard" v-for="routine in routines" :key="routine.id">
                      <router-link :to="{ name: 'routineDetails', params: {id: routine.id}}" class="routineName">
                        <v-icon class="mb-2">{{ routine.iconName }}</v-icon>
                        <h4>{{ routine.name }}</h4>
                      </router-link>
                    </v-sheet>
                  </div>
                </v-main>
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
import AddButton from '@/components/AddButton'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'MyRoutines',
  components: { AddButton },
  data () {
    return {
      valid: true,
      routine: null,
      result: null
      // routinesRules: [
      //   v => !!v || 'Name is required',
      //   v => v.length <= 10 || 'Name must be less than 10 characters'
      // ]
    }
  },
  computed: {
    ...mapState('routines', {
      routines: (state) => state.routines
    })
  },
  methods: {
    ...mapActions('routines', {
      $getAllRoutines: 'getAll'
    }),
    validate () {
      this.$refs.form.validate()
    },
    searchedClicked () {
      this.valid = false
    },
    setResult (result) {
      this.result = JSON.stringify(result, null, 2)
    },
    async getAllRoutines () {
      try {
        await this.$getAllRoutines()
        this.setResult(this.routines)
      } catch (e) {
        this.setResult(e)
      }
    }
  },
  async created () {
    await this.$getAllRoutines()
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
