<template>
  <nav id="nav">
    <router-link to="/">Hubiot</router-link>
    <v-spacer></v-spacer>
    <router-link to="/about">Acerca de Nosotros</router-link>
  </nav>
</template>

<script>
export default {
  name: 'NavigationBar'
}
</script>

<style scoped>
#nav{
  display: flex;
  /*justify-content: center;*/
  background-color: #5B6DCB;
}
</style>
