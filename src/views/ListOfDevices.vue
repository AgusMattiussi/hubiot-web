<template>
  <v-main class="fill-height primary" fluid>
    <v-container elevation="24">
      <v-card class="card secondary">
        <h1>Dispositivos soportados</h1>
        <v-divider class="mb-6"></v-divider>
        <h3>Aire</h3><br/>
        <h3>Alarma</h3><br/>
        <h3>Heladera</h3><br/>
        <h3>Parlante</h3><br/>
        <h3>Persiana</h3><br/>
        <h3>Puerta</h3><br/>
        <h3></h3><br/>
      </v-card>
    </v-container>
  </v-main>
</template>

<script>

export default {
  name: 'ListOfDevices'
}
</script>

<style scoped>
.card {
  margin-left: auto;
  margin-right: auto;
  margin-top: 32px;
  width: 50%;
}

.card h1 {
  margin-bottom: 24px;
}
</style>
