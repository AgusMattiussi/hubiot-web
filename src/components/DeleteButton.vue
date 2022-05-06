<template>
  <span class="delete">
    <button class="btn">
      <v-icon class="mx-auto" color="black">
        mdi-trash-can-outline
      </v-icon>
    </button>
  </span>
</template>

<script>
export default {
  name: 'DeleteButton'
}
</script>

<style scoped>
.btn{
  background-color: #d14545;
  border-radius: 100px;
  border: 0;
  height: 40px;
  width: 40px;
}
</style>
