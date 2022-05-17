<template>
  <span>
    <button class="btn">
      <v-icon class="mx-auto" color="black">
        mdi-pencil-minus-outline
      </v-icon>
    </button>
  </span>
</template>

<script>
export default {
  name: 'ModifyButton'
}
</script>

<style scoped>
.btn{
  background-color: #C5CAE9;
  border: 2px solid black;
  border-radius: 100px;
  height: 40px;
  width: 40px;
}
</style>
