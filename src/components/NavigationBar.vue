<template>
  <v-toolbar class="primary" dense elevation="2">
    <router-link to="/">
      <v-container>
        <v-img class="img" :src="require('../assets/logo.png')" alt="logo"/>
      </v-container>
    </router-link>
    <router-link to="/">
      <v-container>
        <p class="text-h4 white--text pt-3">Hubiot</p>
      </v-container>
    </router-link>
    <router-link to="/devices" class="ml-4">
      <v-btn class="primary" elevation="0">Mis dispositivos</v-btn>
    </router-link>
    <router-link to="/routines" class="ml-2">
      <v-btn class="primary" elevation="0">Mis rutinas</v-btn>
    </router-link>
    <v-spacer></v-spacer>
    <router-link to="/about">
      <v-btn class="primary" elevation="0">
        Acerca de Nosotros
      </v-btn>
    </router-link>
  </v-toolbar>
</template>

<script>
export default {
  name: 'NavigationBar'
}
</script>

<style scoped>
.img{
  width: 30px;
  height: 30px;
}
</style>
