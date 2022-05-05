<template>
  <v-container fluid>
    <v-row class="bgWelcome" align="center">
      <v-col md="6"></v-col>
      <v-col md="1"></v-col>
      <v-col md="4">
        <div class="ma-auto">
          <h1>Bienvenido a <span class="accent--text">Hubiot</span> la solución para el control de tu hogar</h1>
          <v-btn class="registerButton" color="primary" width="400px" height="auto">
            <span class="registerText">Regístrate<br/>
              <span class="registerDescriptionText" >Para comenzar a usar Hubiot</span>
            </span>
          </v-btn>
          <h4 class="primary--text ma-2">¿Ya tienes cuenta? <span class="text-decoration-underline">Inicia sesión</span></h4>
        </div>
      </v-col>
      <v-col md="1"></v-col>
    </v-row>
    <v-row class="" align="center">
      <v-col md="6">
        <p class="heading">Saca el máximo provecho a tus dispositivos inteligentes</p>
        <p class="descriptionText">Hubiot funciona como un control universal para todo tu hogar. Puedes encender la calefacción antes de llegar a casa o activar tu aspiradora mientras sales de paseo. ¡Las posibilidades son ilimitadas!</p>
      </v-col>
      <v-col md="6">
        <v-img :src="require('../assets/loading_img_2.jpg')" :alt="img2" />
      </v-col>
    </v-row>
    <v-row class="grey lighten-3" align="center">
      <v-col md="6">
        <v-img :src="require('../assets/loading_img_3.jpg')" :alt="img2" />
      </v-col>
      <v-col md="6">
        <p class="heading">Cada vez más dispositivos soportados</p>
        <p class="descriptionText">Lámparas, parlantes, puertas y más. Hubiot se expande día a día para brindarte una mayor variedad de dispositivos a tu disposición.</p>
        <h3 class="accent--text mt-5">¿Puedo conectar mi dispositivo?</h3>
        <v-btn color="primary" class="mt-2" rounded large elevation="4" >Mira nuestra lista de dispositivos soportados</v-btn>
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
  background-image: url("../assets/loading_img_01.png");
  background-size: contain;
  min-height: 600px;
}

.registerButton{
  elevation: above;
  border-radius: 50px;
  box-shadow: 4px 4px 4px darkgrey;
}

.registerText{
  font-size: 25px;
  color: #FFFFFF;
  font-weight: bold;
  padding-top: 4px;
}

.registerDescriptionText{
  font-size: 18px;
  color: #FFFFFF;
  font-weight: normal;
  padding-top: 4px;
}

.descriptionText{
  font-size: 22px;
  color: #636363;
}

.heading{
  font-size: 28px;
  color: #000000;
  text-shadow: 2px 2px 2px darkgrey;
  font-weight: bold;
}

</style>
