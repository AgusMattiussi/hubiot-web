<template>
  <v-container class="fill-height bg" fluid>
    <v-card class="card">
      <div>
        <h1 class="cardTitle">{{ device.name }}</h1>
      </div>
      <v-img :src="require(`@/assets/${device.image}`)" alt="parlante" class="img"></v-img>
      <v-card-title class="sectionTitle">Estado</v-card-title>
      <v-card-text class="text-left">
        <ul class="stateText">
          <li>Apagado</li>
          <li>90% de bateria restante</li>
        </ul>
      </v-card-text>
      <v-divider class="mx-4"></v-divider>
      <v-card-title class="sectionTitle">Acciones</v-card-title>
      <v-card-actions>
        <v-btn color="contras" class="actionBtn">Accion1</v-btn>
      </v-card-actions>
      <v-btn color="primary" class="deleleBtn">
        Eliminar Dispositivo
      </v-btn>
    </v-card>
  </v-container>
</template>

<script>

import store from '@/store/store'

export default {
  name: 'DeviceView',
  data () {
    return {
      deviceID: this.$route.params.id
    }
  },
  computed: {
    device () {
      return store.devices.find(device => device.id === this.deviceID)
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
  border-radius: 20px 20px 0 0;
}
.img{
  border-radius: 50%;
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
.actionBtn{
  background-color: #FF8A65;
  color: black;
  border-radius: 20px;
}
.deleleBtn{
  background-color: #5C6BC0;
  color: #FFFFFF;
  font-weight: bolder;
  text-align: right;
}
</style>
