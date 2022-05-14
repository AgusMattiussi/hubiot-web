<template>
<v-container class="fill-height">
  <door-state v-if="deviceTypeName === 'door'" :device-id="deviceId"/>
  <h1 v-else-if="deviceTypeName === 'speaker'"> ES UN PARLANTE </h1>
  <h1 v-else-if="deviceTypeName === 'alarm'"> ES UNA ALARMA </h1>
  <h1 v-else-if="deviceTypeName === 'blinds'"> ES UNA PERSIANA </h1>
  <h1 v-else-if="deviceTypeName === 'ac'"> ES UN AIRE ACONDICIONADO </h1>
  <h1 v-else-if="deviceTypeName === 'refrigerator'"> ES UNA HEALDERA </h1>
  <h1 v-else> NO SE ENCONTRO EL DISPOSITIVO </h1>
</v-container>
</template>

<script>
import DoorState from '@/components/states/DoorState'

export default {
  name: 'StateContainer',
  components: { DoorState },
  props: {
    deviceId: {
      type: String,
      required: true
    },
    deviceTypeId: {
      type: String,
      required: true
    },
    deviceTypeName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      result: null,
      deviceType: null
    }
  }
}
</script>

<style scoped>

</style>
