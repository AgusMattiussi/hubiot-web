<template>
  <v-container fluid>
    <v-row class="bgWelcome" align="center">
      <v-col md="6"></v-col>
      <v-col md="1"></v-col>
      <v-col md="4">
        <div class="ma-auto">
          <h1>Bienvenido a <span class="hubiot">Hubiot</span> la solución para el control de tu hogar</h1>
          <router-link to="/register">
            <v-btn class="registerButton">
              <span class="registerText">Regístrate<br/>
                <span class="registerDescriptionText" >Para comenzar a usar Hubiot</span>
              </span>
            </v-btn>
          </router-link>
          <router-link to="/login">
            <h4 class="login">¿Ya tienes cuenta? <span class="underlineText">Inicia sesión</span></h4>
          </router-link>
        </div>
      </v-col>
      <v-col md="1"></v-col>
    </v-row>
    <v-row class="white" align="center">
      <v-col md="6">
        <p class="heading">Saca el máximo provecho a tus dispositivos inteligentes</p>
        <p class="descriptionText">Hubiot funciona como un control universal para todo tu hogar. Puedes encender la calefacción antes de llegar a casa o activar tu aspiradora mientras sales de paseo. ¡Las posibilidades son ilimitadas!</p>
      </v-col>
      <v-col md="6">
        <v-img :src="require('../assets/loading_img_2.jpg')" alt="Padre con su hijo gestionando la casa de una tablet" class="img"/>
      </v-col>
    </v-row>
    <v-row class="grey lighten-3" align="center">
      <v-col md="6">
        <v-img :src="require('../assets/loading_img_3.jpg')" alt="Mujer sentada en el sillón con una tablet mientras pasa la aspiradora inteligente" class="img"/>
      </v-col>
      <v-col md="6">
        <p class="heading">Cada vez más dispositivos soportados</p>
        <p class="descriptionText">Lámparas, parlantes, puertas y más. Hubiot se expande día a día para brindarte una mayor variedad de dispositivos a tu disposición.</p>
        <h3 class="supportedDevices">¿Puedo conectar mi dispositivo?</h3>
        <v-btn class="supportedDevicesBtn" rounded large elevation="4" >Mira nuestra lista de dispositivos soportados</v-btn>
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
  background-size: cover;
  height: 600px;
}
.hubiot{
  color: #8C9EFF;
}
.img{
  box-shadow: 4px 4px 4px darkgrey;
}
.registerButton{
  elevation: above;
  border-radius: 50px;
  box-shadow: 4px 4px 4px darkgrey;
  width: 400px;
  height: auto !important;
  background-color: #5C6BC0 !important;
}
.login{
  color: #5C6BC0;
  margin: 5px;
}
.underlineText{
  text-decoration: underline;
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
.supportedDevices{
  color: #8C9EFF;
  margin-top: 10px;
}
.supportedDevicesBtn{
  background-color: #5C6BC0 !important;
  color: #FFFFFF;
  margin-top: 4px;
}
</style>
