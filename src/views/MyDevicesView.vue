<template>
  <v-container class="fill-height" fluid>
    <v-main class="fill-height mx-2">
      <v-sheet class="fill-height" elevation="24">
        <v-container class="secondary fill-height" fluid>
        <v-row>
          <v-col md="2">
          </v-col>
          <v-col md="8">
            <v-container><!-- Container para centrar contenido -->
              <h1 class="mb-3">Mis Dispositivos</h1>
              <v-main>
                <form>
                  <div class="d-flex">
                    <v-text-field :counter="18"
                                  :append-icon="'mdi-magnify'"
                                  @click:clear="searchedString = ''"
                                  v-model="searchedString"
                                  placeholder="Buscar dispositivo"
                                  solo
                                  rounded
                                  required
                                  outlined
                                  clearable/>
                    <router-link to="new_device">
                      <AddButton/>
                    </router-link>
                  </div>
                </form>
              </v-main>
              <v-main mt="10">
                <div class="devicesParent">
                  <v-sheet class="deviceCard" v-for="device in getElementsIncluding(searchedString, devices)" :key="device.id">
                    <router-link :to="{ name: 'deviceDetails',
                                        params: {slug: device.name,
                                                 deviceId: device.id,
                                                 deviceName: device.name,
                                                 deviceTypeId: device.type.id,
                                                 deviceTypeName: device.type.name}}"
                                 class="deviceName">
                      <v-img :src="require(`@/assets/${device.meta.image}`)" />
                      <h4>{{ device.name }}</h4>
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
import { mapState, mapActions } from 'vuex'
export default {
  name: 'MyDevices',
  components: { AddButton },
  data () {
    return {
      valid: true,
      result: null,
      searchedString: ''
    }
  },
  computed: {
    ...mapState('devices', {
      devices: (state) => state.devices
    })
  },
  methods: {
    ...mapActions('devices', {
      $getAllDevices: 'getAll'
    }),
    getElementsIncluding (str, array) {
      return array.filter(elem => elem.name.toLowerCase().includes(str.toLowerCase()))
    },
    setResult (result) {
      this.result = JSON.stringify(result, null, 2)
    },
    clearResult () {
      this.result = null
    },
    async getAllDevices () {
      try {
        await this.$getAllDevices()
        this.setResult(this.devices)
      } catch (e) {
        this.setResult(e)
      }
    }
  },
  async created () {
    await this.getAllDevices()
    //   .then(() => {
    //   console.log('Funka')
    // })
  }
}
</script>

<style scoped>

.devicesParent {
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-self: stretch;
}

.deviceCard {
  margin: 10px;
  border-radius: 20px;
  max-width: 120px;
  padding: 10px;
}
.deviceName{
  text-decoration: none;
  font-size: 1.5vw;
}
</style>
