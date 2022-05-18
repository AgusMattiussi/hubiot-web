<template>
  <v-container class="fill-height" fluid>
    <v-main class="fill-height">
      <v-sheet class="fill-height" elevation="24">
        <v-container class="mainContainer fill-height" fluid>
          <v-row>
            <v-col md="2"/>
            <v-col md="8">
              <v-container class="niceWidth">
                <h1 class="heading">Mis Rutinas</h1>
                <form action="">
                  <div class="actionsBar">
                    <v-text-field v-model="searchedString"
                                  :counter="18"
                                  :append-icon="'mdi-magnify'"
                                  @click:clear="searchedString = ''"
                                  placeholder="Buscar rutina"
                                  solo
                                  rounded
                                  required
                                  outlined
                                  clearable/>
                    <router-link to="new_routine">
                      <AddButton class="addButton"/>
                    </router-link>
                  </div>
                </form>
                <v-main class="routines">
                  <div class="routinesParent">
                    <v-sheet class="routineCard" v-for="routine in getElementsIncluding(searchedString, routines)" :key="routine.id">
                      <router-link :to="{ name: 'routineDetails', params: {id: routine.id}}" class="routineName">
                        <v-icon class="routineIcon">mdi-timer-outline</v-icon>
                        <h4>{{ routine.name }}</h4>
                      </router-link>
                    </v-sheet>
                  </div>
                </v-main>
              </v-container>
            </v-col>
            <v-col md="2"/>
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
      result: null,
      searchedString: ''
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
    setResult (result) {
      this.result = JSON.stringify(result, null, 2)
    },
    getElementsIncluding (str, array) {
      return array.filter(elem => elem.name.toLowerCase().includes(str.toLowerCase()))
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
    await this.getAllRoutines()
  }
}
</script>

<style scoped>
.mainContainer{
  background-color: #C5CAE9;
}
.heading{
  margin-bottom: 6px;
}
.actionsBar{
  display: flex;
}
.routines{
  margin-top: 10px;
}
.routinesParent {
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-self: stretch;
}
.routineCard {
  margin: 10px;
  border-radius: 20px;
  width: 120px;
  height: 100px;
  padding: 10px;
}
.routineName{
  text-decoration: none;
  font-size: 1.5vw;
}
.routineIcon{
  margin-bottom: 2px;
  color: black;
  font-size: 40px;
}
</style>
