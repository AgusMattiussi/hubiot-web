<template>
  <v-container class="fill-height bg" fluid>
    <v-row>
      <v-col md="7"></v-col>
      <v-col md="4">
        <v-card class="secondary rounded-xl " elevation="4">
          <div class="cardTitle">
            <h1> Iniciar Sesión </h1>
          </div>
          <v-form class="pa-4" ref="form" v-model="valid" lazy-validation>
            <v-text-field  label="Correo electrónico"></v-text-field>
            <v-text-field label="Contraseña"></v-text-field>
            <p class="forgotPassword">¿Ha olvidado su contraseña?</p>
            <router-link to="devices">
              <v-btn color="primary" class="mr-4">
                <h3 class="white--text">Ingresar</h3>
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
  name: 'LoginView'
}
</script>

<style scoped>
.bg {
  background-image: url("../assets/login_background.png");
  background-size: cover;
}

.cardTitle{
  background-color: #5C6BC0;
  color: #FFFFFF;
}

.forgotPassword{
  text-decoration: underline;
  color: black;
  font-size: 14px;
}
</style>
