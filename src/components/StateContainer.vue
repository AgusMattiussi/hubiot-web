<template>
  <v-container class="fill-height">
    <door-state v-if="deviceTypeName === 'door'" :device-id="deviceId"/>
    <speaker-state v-if="deviceTypeName === 'speaker'" :device-id="deviceId"/>
    <alarm-state v-if="deviceTypeName === 'alarm'" :device-id="deviceId"/>
    <blinds-state v-if="deviceTypeName === 'blinds'" :device-id="deviceId"/>
    <ac-state v-if="deviceTypeName === 'ac'" :device-id="deviceId"/>
    <refrigerator-state v-if="deviceTypeName === 'refrigerator'" :device-id="deviceId"/>
  </v-container>
</template>

<script>
import DoorState from '@/components/states/DoorState'
import SpeakerState from '@/components/states/SpeakerState'
import AcState from '@/components/states/AcState'
import AlarmState from '@/components/states/AlarmState'
import BlindsState from '@/components/states/BlindsState'
import RefrigeratorState from '@/components/states/RefrigeratorState'

export default {
  name: 'StateContainer',
  components: { RefrigeratorState, BlindsState, AlarmState, AcState, SpeakerState, DoorState },
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
