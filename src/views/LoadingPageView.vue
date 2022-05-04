<template>
  <v-container fluid class="indigo lighten-5">
    <v-row class="bgWelcome" align="center">
      <v-col md="8"></v-col>
      <v-col md="2" >
        <div class="ma-auto">
          <h1>Bienvenido a <span class="accent--text">Hubiot</span> la solución para el control de tu hogar</h1>
          <v-btn color="primary" rounded x-large elevation="4">
            <span>Regístrate</span>
            <span>Para comenzar a usar Hubiot</span>
          </v-btn>
        </div>
      </v-col>
      <v-col md="2"></v-col>
    </v-row>
    <v-row class="" align="center">
      <v-col md="6">
        <h2>Saca el máximo provecho a tus dispositivos inteligentes</h2>
        <p>Hubiot funciona como un control universal para todo tu hogar. Puedes encender la calefacción antes de llegar a casa o activar tu aspiradora mientras sales de paseo. ¡Las posibilidades son ilimitadas!</p>
      </v-col>
      <v-col md="6">
        <v-img :src="require('../assets/loading_img_2.jpg')" :alt="img2" />
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col>
        <v-img :src="require('../assets/loading_img_3.jpg')" :alt="img2" />
      </v-col>
      <v-col>
        <h2>Cada vez más dispositivos soportados</h2>
        <p>Lámparas, parlantes, puertas y más. Hubiot se expande día a día para brindarte una mayor variedad de dispositivos a tu disposición.</p>
        <h4 class="accent--text mt-6">¿Puedo conectar mi dispositivo?</h4>
        <v-btn color="primary" class="mt-2" rounded large elevation="4">Dispositivos soportados</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'LoadingPageView'
}
</script>

<style scoped>

.bgWelcome {
  background: url("../assets/loading_img_01.png") no-repeat center center;
  min-height: 600px;
}

</style>
