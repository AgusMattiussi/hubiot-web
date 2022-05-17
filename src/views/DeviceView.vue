<template>
  <v-container class="fill-height bg" fluid>
    <v-card class="card">
      <div class="cardTitle">
        <GoBackButton/>
        <v-main>
          <h1  v-if="!this.editingMode" class="mx-auto">{{ deviceName }}</h1>
          <v-text-field
                        color="white"
                        v-if="this.editingMode"
                        :prepend-inner-icon="'mdi-cancel'"
                        :append-icon="'mdi-check'"
                        @click:prepend-inner="cancelChange"
                        @click:append="checkChange"
                        v-model="newName" placeholder="Ingrese el nuevo nombre" class="my-text-field centered-input text--black ml-10 mr-4">
            </v-text-field>
        </v-main>
        <v-container v-if="!this.editingMode">
          <v-btn outlined x-small fab color="primary" @click="activateEditingMode">
            <v-icon color="black">mdi-pencil</v-icon>
          </v-btn>
        </v-container>
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
      editingMode: true,
      deviceSlug: this.$route.params.slug,
      deviceId: this.$route.params.deviceId,
      deviceName: this.$route.params.deviceName,
      deviceTypeId: this.$route.params.deviceTypeId,
      deviceTypeName: this.$route.params.deviceTypeName,
      newName: ''
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
      $modifyDevice: 'modify',
      $getDevice: 'get'
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
    async cancelChange () {
      this.newName = ''
      this.editingMode = !this.editingMode
    },
    async checkChange () {
      if (this.editingMode) {
        try {
          const toUpdate = {
            name: this.newName,
            id: this.deviceId,
            meta: {
              image: this.device.image
            }
          }
          await this.$modifyDevice(toUpdate)
          this.$router.go(-1)
        } catch (e) {
          console.log('Error changing name: ')
          console.log(e)
        }
      }
      this.editingMode = !this.editingMode
      console.log(this.editingMode)
    },
    activateEditingMode () {
      this.editingMode = !this.editingMode
    }
  }
}
</script>

<style scoped>

.my-text-field .v-icon {
  position: absolute;
  top: 12px;
  right: 8px;
}

.centered-input >>> input {
  text-align: center
}

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

.actionBtn{
  background-color: #FF8A65;
  text-align: center;
  width: 100%;
  margin-left: 5px;
  color: black;
  border-radius: 20px;
}
</style>
