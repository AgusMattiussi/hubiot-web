<template>
  <v-toolbar class="primary" dense elevation="2" >
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
  name: 'BottomBar'
}
</script>

<style scoped>

</style>
