<template>
  <v-container class="bg fill-height" fluid>
    <v-row>
      <v-col md="7"></v-col>
      <v-col md="4">
        <v-card class="secondary rounded-xl " elevation="4">
          <div class="cardTitle">
            <h1> Regístrate </h1>
          </div>
          <v-form class="pa-4" ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required></v-text-field>
            <v-text-field v-model="email" :rules="emailRules" label="Correo electrónico" required></v-text-field>
            <v-text-field v-model="password" :rules="passwordRules" label="Contraseña" required></v-text-field>
            <p class="text-decoration-underline">¿Ha olvidado su contraseña?</p>
            <v-btn :disabled="!valid" color="primary" class="mr-4" @click="validate">
              <h3 class="white--text">Regístrate</h3>
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
      <v-col md="1"></v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'El nombre es obligatorio',
      v => (v && v.length <= 10) || 'El nombre debe ser menor a 10 caracteres'
    ],
    email: '',
    emailRules: [
      v => !!v || 'El correo electrónico es obligatorio',
      v => /.+@.+\..+/.test(v) || 'El correo electrónico debe ser válido'
    ],
    password: '',
    passwordRules: [
      v => !!v || 'La contraseña es obligatoria'
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
  background-image: url("../assets/login_background.png");
  background-size: contain;
}

.cardTitle{
  background-color: #5C6BC0;
  color: #FFFFFF;
}
</style>
