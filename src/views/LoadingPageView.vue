<template>
  <v-container fluid>
    <v-row>
      <v-img :src="require('../assets/loading_img_01.png')" :alt="img1"/>
    </v-row>
    <v-row>
      <v-col>
        <h2>Saca el máximo provecho a tus dispositivos inteligentes</h2>
        <p>Hubiot funciona como un control universal para todo tu hogar. Puedes encender la calefacción antes de llegar a casa o activar tu aspiradora mientras sales de paseo. ¡Las posibilidades son ilimitadas!</p>
      </v-col>
      <v-col>
        <v-img :src="require('../assets/loading_img_2.jpg')" :alt="img2" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-img :src="require('../assets/loading_img_3.jpg')" :alt="img2" />
      </v-col>
      <v-col>
        <h2>Cada vez más dispositivos soportados</h2>
        <p>Lámparas, parlantes, puertas y más. Hubiot se expande día a día para brindarte una mayor variedad de dispositivos a tu disposición.</p>
        <h4> ¿Puedo conectar mi dispositivo? </h4>
<!--        <v-btn elevation="2">Mira nuestra lista de dispositivos soportados</v-btn>-->
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

</style>
