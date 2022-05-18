<template>
  <v-container class="bg fill-height" fluid>
    <v-row>
      <v-col md="7"></v-col>
      <v-col md="4">
        <v-card class="card" elevation="4">
          <div class="cardTitle">
            <h1> Regístrate </h1>
          </div>
          <v-form class="form" ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required></v-text-field>
            <v-text-field v-model="email" :rules="emailRules" label="Correo electrónico" required></v-text-field>
            <v-text-field v-model="password" :rules="passwordRules" label="Contraseña" required></v-text-field>
            <router-link to="devices">
              <v-btn :disabled="!valid" class="btn" @click="validate">
                <h3>Regístrate</h3>
              </v-btn>
            </router-link>
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
    }
  }
}
</script>

<style scoped>
.bg {
  background-image: url("../assets/login_background.png");
  background-size: cover;
}
.card{
  background-color: #C5CAE9 !important;
  border-radius: 30px !important;
}
.form{
  padding: 15px;
}
.cardTitle{
  background-color: #5C6BC0;
  color: #FFFFFF;
}
.btn{
  color: #FFFFFF;
  background-color: #5C6BC0 !important;
  text-decoration: none;
}
</style>
