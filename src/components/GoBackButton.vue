<template>
  <span class="go-back">
    <button @click="goBack" class="btn icon">
      <v-icon class="" dark color="black">
        mdi-arrow-left
      </v-icon>
    </button>
  </span>
</template>

<script>
export default {
  name: 'GoBackButton',
  methods: {
    goBack () {
      return this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.btn{
  margin: 5px;
  background-color: #E8EAF6;
  border-radius: 100px;
  border: 0;
  height: 40px;
  width: 40px;
}
</style>
