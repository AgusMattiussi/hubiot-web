<template>
    <div id="app">
      <v-app id="app">
        <NavigationBar/>
        <router-view :key="$route.path"/>
      </v-app>
    </div>
</template>

<style>
#app {
  font-family: Roboto, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  text-align: center;
  color: #000000;
}

nav {

}

nav a {
  font-weight: bold;
  color: #FFFFFF;
}

</style>

<script>
import NavigationBar from '@/components/NavigationBar'
export default {
  name: 'App',
  components: { NavigationBar },
  data: () => ({
  })
}
</script>
