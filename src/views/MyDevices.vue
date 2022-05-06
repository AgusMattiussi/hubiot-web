<template>
  <v-container class="fill-height" fluid>
    <v-main class="fill-height accent mx-2">
      <v-sheet class="fill-height" elevation="24">
        <v-container class="accent fill-height" fluid>
        <v-row>
          <v-col md="2"></v-col>
          <v-col md="8">
            <v-container class="niceWidth"><!-- Container para centrar contenido -->
              <h1>Mis dispositivos</h1>
              <form action="">
                <div class="d-flex">
                  <v-text-field
                    v-model="device"
                    :rules="deviceRules"
                    :counter="18"
                    placeholder="Buscar dispositivo"
                    solo
                    required
                    outlined
                    clearable
                    class="pt-5 mr-2"
                    append-icon="mdi-magnify"
                  ></v-text-field>
                  <!--
                  <v-btn
                    x-large
                    :disabled="!valid"
                    color="primary"
                    class="mr-4"
                    @click="validate"
                  >
                    Search
                  </v-btn>
                  -->
                </div>
              </form>
              <v-content mt="10">
                <div class="devicesParent">
                  <v-card class="deviceCard" v-for="device in devices" :key="device.id">
                    <router-link :to="{ name: 'deviceDetails', params: {id: device.id}}">
                      <v-img :src="require(`@/assets/${device.image}`)" />
                      <h4>{{ device.name }}</h4>
                    </router-link>
                  </v-card>
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
  name: 'MyRooms',
  data () {
    return {
      devices: store.devices,
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

.niceWidth {
  width: 50%;
}

.devicesParent {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.deviceCard {
  margin: 10px;
  padding: 10px;
  border-radius: 20px;
  width: 25%;
  height: 25%;
}
</style>
