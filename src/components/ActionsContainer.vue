<template>
  <v-container class="fill-height">
    <door-actions v-if="deviceTypeName === 'door'" :device-type-id="deviceTypeId"/>
  </v-container>
</template>

<script>
import DoorActions from '@/components/actions/DoorActions'
export default {
  name: 'ActionsContainer',
  components: { DoorActions },
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
