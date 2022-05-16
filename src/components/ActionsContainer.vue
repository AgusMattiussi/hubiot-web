<template>
  <v-container class="fill-height">
    <door-actions v-if="deviceTypeName === 'door'" :device-id="deviceId"/>
    <blinds-actions v-if="deviceTypeName === 'blinds'" :device-id="deviceId"/>
    <refrigerator-actions v-if="deviceTypeName === 'refrigerator'" :device-id="deviceId"/>
    <speaker-actions v-if="deviceTypeName === 'speaker'" :device-id="deviceId"/>
    <alarm-actions v-if="deviceTypeName === 'alarm'" :device-id="deviceId"/>
    <ac-actions v-if="deviceTypeName === 'ac'" :device-id="deviceId"/>
  </v-container>
</template>

<script>
import DoorActions from '@/components/actions/DoorActions'
import BlindsActions from '@/components/actions/BlindsActions'
import RefrigeratorActions from '@/components/actions/RefrigeratorActions'
import SpeakerActions from '@/components/actions/SpeakerActions'
import AlarmActions from '@/components/actions/AlarmActions'
import AcActions from '@/components/actions/AcActions'

export default {
  name: 'ActionsContainer',
  components: { AcActions, AlarmActions, SpeakerActions, RefrigeratorActions, DoorActions, BlindsActions },
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
