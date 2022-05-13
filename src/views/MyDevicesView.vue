<template>
  <v-container class="fill-height" fluid>
    <v-main class="fill-height mx-2">
      <v-sheet class="fill-height" elevation="24">
        <v-container class="secondary fill-height" fluid>
        <v-row>
          <v-col md="2"></v-col>
          <v-col md="8">
            <v-container><!-- Container para centrar contenido -->
              <h1>Mis dispositivos</h1>
              <v-main>
                <form action="">
                  <div class="d-flex">
                    <v-text-field v-model="device" :rules="deviceRules" :counter="18" :append-icon="'mdi-magnify'" @click:append="searchedClicked" placeholder="Buscar dispositivo" solo required outlined clearable></v-text-field>
                    <v-btn class="mx-2" fab dark color="primary">
                      <v-icon dark>
                        mdi-magnify
                      </v-icon>
                    </v-btn>
                  </div>
                </form>
              </v-main>
              <v-content mt="10">
                <div class="devicesParent">
                  <v-sheet class="deviceCard" v-for="device in devices" :key="device.slug">
                    <router-link :to="{ name: 'deviceDetails', params: {slug: device.slug}}" class="deviceName">
                      <v-img :src="require(`@/assets/${device.image}`)" />
                      <h4>{{ device.name }}</h4>
                    </router-link>
                  </v-sheet>
                  <v-main class="deviceCard">
                    <router-link to="new_routine">
                      <v-btn fab dark color="#FF8A65">
                        <v-icon dark>
                          mdi-plus
                        </v-icon>
                      </v-btn>
                    </router-link>
                  </v-main>
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
// import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'MyRooms',
  components: { },
  data () {
    return {
      devices: store.devices,
      valid: true,
      device: '',
      deviceRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters'
      ]
    }
  },
  methods: {
    ...mapActions(),
    validate () {
      this.$refs.form.validate()
    },
    searchedClicked () {
      console.log('funakndo')
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
  max-width: 100px;
  max-height: 140px;
}
.deviceName{
  text-decoration: none;
  font-size: 1.5vw;
}
</style>
