<template>
  <v-container class="fill-height" fluid>
    <v-main class="fill-height mx-2">
      <v-sheet class="fill-height" elevation="24">
        <v-container class="secondary fill-height" fluid>
        <v-row>
          <v-col md="2"></v-col>
          <v-col md="8">
            <v-container><!-- Container para centrar contenido -->
              <h1 class="mb-3">Mis dispositivos</h1>
              <v-main>
                <form action="">
                  <div class="d-flex">
                    <v-text-field v-model="device"
                                  :counter="18"
                                  :append-icon="'mdi-magnify'"
                                  @click:append="searchedClicked"
                                  placeholder="Buscar dispositivo"
                                  solo
                                  required
                                  outlined
                                  clearable/>
                    <router-link to="new_device">
                      <AddButton/>
                    </router-link>
                  </div>
                </form>
              </v-main>
              <v-content mt="10">
                <div class="devicesParent">
                  <v-sheet class="deviceCard" v-for="device in devices" :key="device.id">
                    <router-link :to="{ name: 'deviceDetails', params: {slug: device.slug}}" class="deviceName">
<!--                      <v-img :src="require(`@/assets/${device.image}`)" />-->
<!--                      <h1>todoo device: {{ device}}</h1>-->
                      <h4>{{ device.name }}</h4>
                    </router-link>
                  </v-sheet>
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

import AddButton from '@/components/AddButton'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'MyDevices',
  components: { AddButton },
  data () {
    return {
      valid: true,
      device: null,
      result: null
    }
  },
  computed: {
    ...mapState('devices', {
      devices: (state) => state.devices
    })
  },
  methods: {
    ...mapActions('devices', {
      // $createDevice: 'create',
      // $modifyDevice: 'modify',
      // $deleteDevice: 'delete',
      // $getDevice: 'get',
      $getAllDevices: 'getAll'
    }),
    validate () {
      this.$refs.form.validate()
    },
    searchedClicked () {
      console.log('funkando')
    },
    setResult (result) {
      this.result = JSON.stringify(result, null, 2)
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
    await this.$getAllDevices()
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
  justify-content: space-evenly;
  align-self: stretch;
}

.deviceCard {
  margin: 10px;
  border-radius: 20px;
  max-width: 100px;
  max-height: 140px;
}
.deviceName{
  text-decoration: none;
  font-size: 1.5vw;
}
</style>
