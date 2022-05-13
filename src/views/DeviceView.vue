<template>
  <v-container class="fill-height bg" fluid>
    <v-card class="card">
      <div class="cardTitle">
        <GoBackButton/>
        <h1 class="mx-auto">{{ device.name }}</h1>
        <button @click="deleteDevice">
          <DeleteButton class="deleteBtn"/>
        </button>
      </div>
      <v-img :src="require(`@/assets/${device.image}`)" alt="parlante" class="img"></v-img>
      <v-card-title class="sectionTitle">Estado</v-card-title>
      <v-card-text class="text-left">
<!--        <ul class="stateText">
          <li>Apagado</li>
          <li>90% de batería restante</li>
        </ul>-->
        <state-container :device-id="deviceId.toString()"
                         :device-type-id="deviceTypeId.toString()"
                         :device-type-name="deviceTypeName.toString()"/>
      </v-card-text>
      <v-divider class="mx-4"></v-divider>
      <v-card-title class="sectionTitle">Acciones</v-card-title>
      <v-card-actions class="actions" v-for="action in device.actions" :key="action.slug">
          <!-- ACA VAN LAS ACCIONES -->
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>

import store from '@/store/store'
import GoBackButton from '@/components/GoBackButton'
import DeleteButton from '@/components/DeleteButton'
import StateContainer from '@/components/StateContainer'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'DeviceView',
  components: {
    StateContainer,
    DeleteButton,
    GoBackButton
  },
  data () {
    return {
      deviceSlug: this.$route.params.slug,
      deviceId: this.$route.params.deviceId,
      deviceTypeId: this.$route.params.deviceTypeId,
      deviceTypeName: this.$route.params.deviceTypeName
    }
  },
  computed: {
    ...mapState('devices', {
      devices: (state) => state.devices
    }),
    device () {
      return store.devices.find(device => device.type.id === this.deviceTypeId)
    }
  },
  methods: {
    ...mapActions('devices', {
      $deleteDevice: 'delete'
    }),
    async deleteDevice () {
      const dev = this.devices.find(dev => this.device.type.id === this.deviceSlug)
      try {
        await this.$deleteDevice(dev.id)
        this.$router.go(-1)
        this.device = null
        this.clearResult()
      } catch (e) {
        this.setResult(e)
      }
    }
  }
}
</script>

<style scoped>
.bg {
  background-image: url("../assets/background_my_device.png");
  background-size: cover;
}
.card{
  background-color: #E8EAF6;
  border-radius: 20px;
  margin: auto;
  width: 500px;
  padding-bottom: 10px;
}
.cardTitle{
  background-color: #5C6BC0;
  color: #FFFFFF;
  text-align: center;
  display: flex;
  border-radius: 20px 20px 0 0;
}
.deleteBtn{
  margin: 5px;
  float: right;
}
.img{
  border-radius: 50%;
  padding-left: 10px;
  height: 200px;
  width: 200px;
  overflow: hidden;
  display: inline-block;
}
.sectionTitle{
  color: black;
  font-weight: bold;
  font-size: 20px;
}
.stateText{
  color: black;
  font-size: 16px;
  font-weight: normal;
}
.actions{
  display: flex;
  overflow: hidden;
  justify-content: space-between;
}
.actionBtn{
  background-color: #FF8A65;
  text-align: center;
  width: 100%;
  margin-left: 5px;
  color: black;
  border-radius: 20px;
}
</style>
