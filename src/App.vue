<template>
    <div id="app">
      <v-app id="app">
        <NavigationBar/>
        <router-view :key="$route.path"/>
        <BottomBar/>
      </v-app>
    </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
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

/*nav a.router-link-exact-active {*/
/*  color: #5B6DCB;*/
/*}*/
</style>

<script>
import NavigationBar from '@/components/NavigationBar'
import BottomBar from '@/components/BottomBar'
export default {
  name: 'App',
  components: { NavigationBar, BottomBar },
  data: () => ({
  })
}
</script>
