<template>
  <v-container class="fill-height" >
    <v-main>
      <br>
      <h1>Not Found</h1>
      <p>Oops! we couldn't find that page. Try going to <router-link :to="{name:'devices'}">Mis Dispositivos</router-link></p>
    </v-main>
  </v-container>
</template>

<script>
export default {
  name: 'NotFoundView'
}
</script>

<style scoped>

</style>
