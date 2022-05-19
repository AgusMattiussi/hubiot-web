<template>
<v-container class="fill-height container">
  <img v-if="loading"
       :src="require('@/assets/ajax-loader.gif')"
       alt="loading">
  <div v-else>
    <v-card class="stateCard">
      <v-card-text>
        <ul class="list">
          <li v-if="door.status === 'closed'">
            <v-icon>
              mdi-door
            </v-icon>
            Cerrada
          </li>
          <li v-else>
            <v-icon>
              mdi-door-open
            </v-icon>
            Abierta
          </li>
          <li v-if="door.lock === 'unlocked'">
            <v-icon>
              mdi-door-closed
            </v-icon>
            Desbloqueada
          </li>
          <li v-else>
            <v-icon>
              mdi-door-closed-lock
            </v-icon>
            Bloqueada
          </li>
        </ul>
      </v-card-text>
    </v-card>
  </div>
</v-container>
</template>

<script>

import { mapActions, mapState } from 'vuex'

export default {
  name: 'DoorState',
  props: {
    deviceId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      result: null,
      door: null,
      loading: false
    }
  },
  computed: {
    ...mapState('devices', {
      devices: (state) => state.devices
    })
  },
  mounted () {
    this.$root.$on('doorStateUpdated', () => {
      this.getDoorState()
    })
  },
  methods: {
    ...mapActions('devices', {
      $getDoorState: 'getState'
    }),
    setResult (result) {
      this.result = JSON.stringify(result, null, 2)
    },
    async getDoorState () {
      try {
        this.door = await this.$getDoorState(this.deviceId)
      } catch (e) {
        console.log('StateError')
      }
    }
  },
  async created () {
    this.loading = true
    await this.getDoorState()
      // eslint-disable-next-line no-return-assign
      .then(() => this.loading = false)
  }
}
</script>

<style scoped>
.container{
  padding: 0;
  margin: 0;
}
.stateCard{
  min-height: 5vh;
  width: auto;
  background-color: #C5CAE9;
  padding-right: 10px;
}
.list {
  list-style: none;
  color: black;
  font-size: 16px;
}
</style>
