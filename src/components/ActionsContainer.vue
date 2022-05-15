<template>
  <v-container class="fill-height">
    <door-actions v-if="deviceTypeName === 'door'" :device-id="deviceId"/>
    <blinds-actions v-if="deviceTypeName === 'blinds'" :device-id="deviceId"/>
    <refrigerator-actions v-if="deviceTypeName === 'refrigerator'" :device-id="deviceId"/>
  </v-container>
</template>

<script>
import DoorActions from '@/components/actions/DoorActions'
import BlindsActions from '@/components/actions/BlindsActions'
import RefrigeratorActions from '@/components/actions/RefrigeratorActions'

export default {
  name: 'ActionsContainer',
  components: { RefrigeratorActions, DoorActions, BlindsActions },
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
  }
}

</script>

<style scoped>

</style>
