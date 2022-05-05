<template>
  <v-container class="fill-height" fluid>
    <v-card class="accent" height="100%" elevation="24">
      <v-navigation-drawer permanent expand-on-hover>
        <v-list class="primary">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                Ambientes
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list class="accent" nav dense>
          <v-list-item v-for="room in rooms" :key="room.id" link>
            <v-list-item-title>{{ room.roomName }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    </v-card>
    <v-main class="fill-height accent ma-2">
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
                    <router-link :to="{ name: 'devicesDetails', params: {name: device.name}}">
                      <v-img :src="require('../assets/loading_img_3.jpg')" />
                      <h4>{{ device.deviceName }}</h4>
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
export default {
  name: 'MyRooms',
  data () {
    return {
      devices: [
        {
          id: 0,
          deviceName: 'Luz',
          deviceIcon: 'mdi-sun',
          slug: 'piezamatias-luz'
        },
        {
          id: 1,
          deviceName: 'Agua',
          deviceIcon: 'mdi-water',
          slug: 'piezamatias-agua'
        },
        {
          id: 2,
          deviceName: 'Aire',
          deviceIcon: 'mdi-water',
          slug: 'piezamatias-aire'
        },
        {
          id: 3,
          deviceName: 'Fuego',
          deviceIcon: 'mdi-water',
          slug: 'piezamatias-fuego'
        },
        {
          id: 4,
          deviceName: 'Tierra',
          deviceIcon: 'mdi-water',
          slug: 'piezamatias-tierra'
        }
      ],
      rooms: [
        {
          id: 0,
          roomName: 'Heladera',
          iconName: 'mdi-sun',
          slug: 'piezadematias'
        },
        {
          id: 1,
          roomName: 'Cocina',
          iconName: 'mdi-kitchen',
          slug: 'cocina'
        },
        {
          id: 2,
          roomName: 'Living',
          iconName: 'mdi-room',
          slug: 'living'
        }
      ],
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
  border-radius: 5px 20px 5px;
  width: 25%;
  height: 25%;
}

</style>
