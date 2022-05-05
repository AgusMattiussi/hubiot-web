<template>
<v-container class="fill-height background justify-center" >
  <v-sheet class="card" elevation="24">
    <v-sheet class="cardTitle">
      <h1 class="align-content-cente"> Nuevo Dispositivo </h1>
    </v-sheet>
  </v-sheet>
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
    background-size: contain;
  }
  .card{
    height: 50vh;
    width: 70vh;
    border-radius: 2vh;
  }
  .cardTitle{
    height: 7vh;
    padding: 1vh;
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
    background-color: #5C6BC0;
    color: #FFFFFF;
  }
</style>
