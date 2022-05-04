<template>
  <v-toolbar class="primary" dense elevation="2" >
    <v-toolbar-title>
      <router-link to="/">
        <p class="text-h4 white--text ma-2">Hubiot</p>
      </router-link>
    </v-toolbar-title>
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

</style>
