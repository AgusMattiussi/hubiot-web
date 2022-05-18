<template>
  <v-container class="fill-height" fluid>
    <v-main class="fill-height">
      <v-sheet class="fill-height" elevation="24">
        <v-container class="mainContainer fill-height" fluid>
          <v-row>
            <v-col md="2"/>
            <v-col md="8">
              <v-container>
                <h1 class="heading">Mis Dispositivos</h1>
                <v-main class="mainContainer">
                  <form action="">
                    <div class="actionsBar">
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
                <v-main class="devices">
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
            <v-col md="2"/>
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
.devices{
  margin-top: 10px;
}
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
  overflow: hidden;
}
.deviceName{
  text-decoration: none;
}
</style>
