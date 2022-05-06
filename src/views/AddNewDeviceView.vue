<template>
<v-container class="fill-height background justify-center" fluid>
  <v-card class="card" elevation="24">
    <v-card class="cardTitle" elevation="0">
      <h1> Nuevo Dispositivo </h1>
    </v-card>
    <h2 class="mt-6"> ¿Cómo se llamará el nuevo dispositivo?</h2>
    <input type="text" class="deviceNameBox rounded" placeholder="Nuevo Dispositivo"/>
    <img class="deviceImage border" src="@/assets/parlante.png" alt="Parlante">
    <v-btn class="nextButton v-size--x-large accent black--text"> Siguiente </v-btn>
  </v-card>
</v-container>
</template>

<script>
export default {
  name: 'AddNewDeviceView.vue'
}
</script>

<style scoped>
  .background{
    background-image: url('../assets/background_my_device.png');
    background-size: cover;
  }
  .card{
    elevation: 24deg;
    height: 640px;
    width: 680px;
    border-radius: 20px;
    margin: auto;
    background-color: #C3CCFF;
  }
  .cardTitle{
    height: 70px;
    padding: 10px;
    border-radius: 0;
    text-align: center;
    background-color: #5C6BC0;
    color: #FFFFFF;
  }
  .deviceNameBox{
    background-color: #FFFFFF;
    margin: 20px auto;
    padding: 8px;
    width: 400px;
    display: block;
  }
  .deviceImage{
    max-width: 200px;
    height: auto;
    display: block;
    margin: 30px auto;
    border-radius: 50% !important;
    background-color: #FFFFFF;
    border: 1px solid #5C6BC0;
  }
  .nextButton{
    margin: 50px auto;
  }

</style>
