<template>
  <v-container class="fill-height bg" fluid>
    <v-row>
      <v-col md="6"></v-col>
      <v-col md="4">
        <v-card class="secondary pa-4 rounded-xl" elevation="4">
          <v-card-title class="primary pa-2">
            Iniciar sesión
          </v-card-title>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required></v-text-field>
            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
            <p>¿Ha olvidado su contrazeña?</p>
            <v-btn :disabled="!valid" color="primary" class="mr-4" @click="validate">
              Registrarse
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
      <v-col md="2"></v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters'
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    select: null
  }),
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    }
  }
}
</script>
<style scoped>

.bg {
  background: url("../assets/register_background.png") no-repeat center center;
}

</style>
