<template>
  <span>
    <button class="btn" @click="clicked">
      <v-icon class="icon">
        mdi-trash-can-outline
      </v-icon>
    </button>
  </span>
</template>

<script>
export default {
  name: 'DeleteButton',
  methods: {
    clicked () {
      this.$emit('deleteClicked')
    }
  }
}
</script>

<style scoped>
.btn{
  margin: 5px;
  background-color: #d14545;
  border-radius: 100px;
  border: 0;
  height: 40px;
  width: 40px;
}
.icon{
  margin: auto;
  color: black;
  font-size: 25px;
}
</style>
