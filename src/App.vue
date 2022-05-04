<template>
  <v-app>
    <div id="app">
      <NavigationBar/>
      <router-view :key="$route.path"/>
    </div>
  </v-app>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
}

nav {

}

nav a {
  font-weight: bold;
  color: #FFFFFF;
}

/*nav a.router-link-exact-active {*/
/*  color: #5B6DCB;*/
/*}*/
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
