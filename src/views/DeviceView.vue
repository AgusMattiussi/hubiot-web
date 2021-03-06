<template>
  <v-container class="fill-height bg" fluid>
    <v-card class="card">
      <div class="cardTitle">
        <GoBackButton/>
        <v-main>
          <form ref="form">
            <v-text-field color="white"
                          v-if="this.editingMode"
                          :prepend-inner-icon="'mdi-cancel'"
                          :append-icon="isNameValid(newName) ? 'mdi-check' : 'mdi-blank'"
                          @click:prepend-inner="cancelChange"
                          @click:append="checkChange"
                          v-model="newName"
                          :counter="this.maxLength"
                          :placeholder=deviceName
                          :rules="[isNameValid(newName, true)]"
                          required
                          class="deviceName centered-input ml-10 mr-4">
              </v-text-field>
          </form>
        </v-main>
        <v-main v-if="!this.editingMode" class="mt-1">
          <v-card v-if="!this.editingMode" class="primary pa-0" elevation="0">
            <v-card-title class="title">
              {{ deviceName }}
              <v-btn class="ml-2" outlined small fab color="primary" @click="activateEditingMode">
                <v-icon color="white">mdi-pencil</v-icon>
              </v-btn>
            </v-card-title>
          </v-card>
        </v-main>
        <DeleteButton @deleteClicked="deleteDevice"/>
      </div>
      <v-row>
        <v-col md="4"/>
        <v-col md="4">
          <v-img :src="require(`@/assets/${device.image}`)" alt="parlante" class="img"/>
        </v-col>
        <v-col md="4"/>
      </v-row>
      <v-divider class="mx-4"></v-divider>
      <v-card-title class="sectionTitle">Estado</v-card-title>
      <v-card-text class="state">
        <state-container :device-id="deviceId.toString()"
                         :device-type-id="deviceTypeId.toString()"
                         :device-type-name="deviceTypeName.toString()"/>
      </v-card-text>
      <v-divider class="mx-4"></v-divider>
      <v-card-title class="sectionTitle">Acciones</v-card-title>
      <v-card-actions class="actions">
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

export default {
  name: 'DeviceView',
  components: {
    StateContainer,
    DeleteButton,
    GoBackButton,
    ActionsContainer
  },
  data () {
    return {
      editingMode: false,
      deviceSlug: this.$route.params.slug,
      deviceId: this.$route.params.deviceId,
      deviceName: this.$route.params.deviceName,
      deviceTypeId: this.$route.params.deviceTypeId,
      deviceTypeName: this.$route.params.deviceTypeName,
      newName: '',
      maxLength: 12
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
    isNameValid (name, withMsg) {
      const msg = 'El nombre debe tener entre 3 y ' + this.maxLength.toString() + ' caracteres'
      if (name.length >= 3 && name.length <= this.maxLength) {
        return true
      }
      return withMsg ? msg : false
    },
    async deleteDevice () {
      try {
        await this.$deleteDevice(this.deviceId)
        this.$router.go(-1)
        this.device = null
        this.clearResult()
      } catch (e) {
        console.log('deleteDeviceError')
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
          this.deviceName = this.newName
        } catch (e) {
          console.log('Error changing name')
        }
      }
      this.activateEditingMode()
    },
    activateEditingMode () {
      this.editingMode = !this.editingMode
    }
  }
}
</script>

<style scoped>
.topBar h1 {
  display: inline;
  margin-top: 12px;
}

.topBar v-icon {

}
.deviceName .v-icon {
  position: absolute;
  top: 12px;
  right: 8px;
  color: white;
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
.title{
  font-size: 30px !important;
  font-weight: bold;
  color: white;
  padding: 0;
}
.state{
  text-align: left;
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
