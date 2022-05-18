<template>
  <span class="go-back">
    <button @click="goBack" class="btn">
      <v-icon class="icon">
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
.icon{
  color: black;
  font-size: 25px;
}
</style>
