<template>
  <router-link to="new_device">
  <span class="go-back">
    <button class="btn icon">
      <v-icon class="mx-auto" x-large color="white">
        mdi-plus
      </v-icon>
    </button>
  </span>
  </router-link>
</template>

<script>
export default {
  name: 'AddButton'
}
</script>

<style scoped>
.btn{
  margin: 5px;
  background-color: #FF8A65;
  border-radius: 100px;
  border: 0;
  height: 100px;
  width: 100px;
  box-shadow: 2px 0 4px 1px rgba(0, 0, 0, 0.2);
}
</style>
