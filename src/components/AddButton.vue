<template>
  <span>
    <button class="btn">
      <v-icon class="icon">
        mdi-plus
      </v-icon>
    </button>
  </span>
</template>

<script>
export default {
  name: 'AddButton'
}
</script>

<style scoped>
.btn{
  margin-left: 5px;
  background-color: #FF8A65;
  border-radius: 100px;
  border: 0;
  height: 60px;
  width: 60px;
  box-shadow: 2px 0 4px 1px rgba(0, 0, 0, 0.2);
  text-decoration: none;
}
.icon{
  margin: auto;
  color: white;
  font-size: 40px;
}
</style>
