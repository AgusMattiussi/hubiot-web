<template>
    <div id="app">
      <NavigationBar/>
      <router-view :key="$route.path"/>
    </div>
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
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #FFFFFF;
  padding: 0 10px;
}

/*nav a.router-link-exact-active {*/
/*  color: #5B6DCB;*/
/*}*/
</style>

<script>
import NavigationBar from '@/components/NavigationBar'
export default {
  components: { NavigationBar }
}
</script>
