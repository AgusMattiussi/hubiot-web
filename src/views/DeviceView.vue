<template>
  <v-container class="fill-height bg" fluid>
    <v-card class="card">
      <div class="cardTitle">
        <GoBackButton/>
        <h1 class="mx-auto">{{ deviceName }}</h1>
        <button @click="deleteDevice">
          <DeleteButton class="deleteBtn"/>
        </button>
      </div>
      <v-row>
        <v-col md="4"/>
        <v-col md="4">
          <v-img :src="require(`@/assets/${device.image}`)" alt="parlante" class="img"></v-img>
        </v-col>
        <v-col md="4">
          <button @click="modifyDevice">
            <ModifyButton class="modifyBtn"/>
          </button>
        </v-col>
      </v-row>
      <v-divider class="mx-4"></v-divider>
      <v-card-title class="sectionTitle">Estado</v-card-title>
      <v-card-text class="text-left">
        <state-container :device-id="deviceId.toString()"
                         :device-type-id="deviceTypeId.toString()"
                         :device-type-name="deviceTypeName.toString()"/>
      </v-card-text>
      <v-divider class="mx-4"></v-divider>
      <v-card-title class="sectionTitle">Acciones</v-card-title>
      <v-card-actions class="actions">
          <!-- ACA VAN LAS ACCIONES -->
        <actions-container :device-id="deviceId.toString()"
                           :device-type-id="deviceTypeId.toString()"
                           :device-type-name="deviceTypeName.toString()"/>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>

import store from '@/store/store'
import GoBackButton from '@/components/GoBackButton'
import DeleteButton from '@/components/DeleteButton'
import StateContainer from '@/components/StateContainer'
import ActionsContainer from '@/components/ActionsContainer'
import { mapActions, mapState } from 'vuex'
import ModifyButton from '@/components/ModifyButton'

export default {
  name: 'DeviceView',
  components: {
    ModifyButton,
    StateContainer,
    DeleteButton,
    GoBackButton,
    ActionsContainer
  },
  data () {
    return {
      deviceSlug: this.$route.params.slug,
      deviceId: this.$route.params.deviceId,
      deviceName: this.$route.params.deviceName,
      deviceTypeId: this.$route.params.deviceTypeId,
      deviceTypeName: this.$route.params.deviceTypeName,
      newDeviceName: null
    }
  },
  computed: {
    ...mapState('devices', {
      devices: (state) => state.devices
    }),
    device () {
      return store.devices.find(device => device.type.id === this.deviceTypeId)
    }
  },
  methods: {
    ...mapActions('devices', {
      $deleteDevice: 'delete',
      $modifyDevice: 'modify'
    }),
    async deleteDevice () {
      try {
        await this.$deleteDevice(this.deviceId)
        this.$router.go(-1)
        this.device = null
        this.clearResult()
      } catch (e) {
        this.setResult(e)
      }
    },
    async modifyDevice () {
      const device = {
        id: this.deviceId,
        name: this.newDeviceName
      }
      try {
        await this.$modifyDevice(device)
        this.device = null
        this.clearResult()
      } catch (e) {
        this.setResult(e)
      }
    }
  }
}
</script>

<style scoped>
.bg {
  background-image: url("../assets/background_my_device.png");
  background-size: cover;
}
.card{
  background-color: #E8EAF6;
  border-radius: 20px;
  margin: auto;
  width: 500px;
  padding-bottom: 10px;
}
.cardTitle{
  background-color: #5C6BC0;
  color: #FFFFFF;
  text-align: center;
  display: flex;
  border-radius: 20px 20px 0 0;
}
.deleteBtn{
  margin: 5px;
  float: right;
}
.modifyBtn{
  margin-top: 5px;
  float: right;
}
.img{
  border-radius: 50%;
  padding-left: 10px;
  height: 200px;
  width: 200px;
  overflow: hidden;
  display: inline-block;
}
.sectionTitle{
  color: black;
  font-weight: bold;
  font-size: 20px;
  padding: 16px 0 0 16px;
}
.actions{
  display: flex;
  overflow: hidden;
  justify-content: space-between;
}
</style>
