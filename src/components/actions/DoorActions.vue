<template>
  <v-container class="fill-height pa-0 ma-0">
    <div>
<!--      <p> {{ deviceTypeId }}</p>-->
<!--      <p v-for="type in deviceTypes" :key="type.id"> {{type.name}}</p>-->
<!--      <v-autocomplete-->
<!--        :items="actions"-->
<!--        rounded-->
<!--        solo-->
<!--        item-text="name"-->
<!--        auto-select-first-->
<!--        return-object-->
<!--        hide-details-->
<!--        hide-no-data/>-->
    </div>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'DoorActions',
  props: {
    deviceTypeId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      actions: []
    }
  },
  computed: {
    ...mapState('deviceTypes', {
      deviceTypes: (state) => state.deviceTypes
    })
  },
  methods: {
    getActions () {
      this.actions = this.$store.getters['deviceTypes/getTypeForDeviceID'](this.deviceTypeId).actions
    }
  },
  async created () {
    await this.getActions()
    // console.log(this.actions)
  }
}
</script>

<style scoped>

</style>
