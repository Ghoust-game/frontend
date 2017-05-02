<template>
    <div v-if="isMqttConnected">
      <h3>Clients</h3>

      <div class="client-list">

        <div class="client" v-for="client in getClients">
          <h4>{{ client.label }}</h4>

          <div class="batteryLevel">
            Battery: {{ client.batteryLevel }}<br>
            <img src="../assets/battery-low.jpg" style="width:60px;" v-show="client.batteryLevel < 450" />
          </div>

          <button @click="setLabel(client.id)" class="btn btn-default">Set label</button>
          <button @click="setColorRed(client.id)" class="btn btn-default">Set color to red for 2s</button>
        </div>
      </div>

    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import * as types from '../store/mutation-types'

export default {
  computed: mapGetters([
    'getClients',
    'isMqttConnected'
  ]),

  methods: {
    setLabel (clientId) {
      let label = window.prompt('Label for ' + clientId)
      if (!label) {
        label = clientId
      }
      this.$store.commit(types.SET_LABEL, { clientId, label })
    },

    setColorRed (clientId) {
      console.log('set color to red')
      this.$store.dispatch('sendToClient', { topic: `GHOUST/clients/${clientId}/config/led`, message: 'RAW:1023,0,0,2000' })
    },

    ...mapActions([])
  },

  components: {
  }
}
</script>

<style>
.client-list {
  display: flex;
}

.client {
  width: 200px;  /* Or whatever */
  height: 200px; /* Or whatever */
  padding: 10px 20px;
  margin: 20px;
  border: 1px solid gray;
}

.client .btn {
  margin-top: 4px;
  margin-bottom: 4px;
}

.client .batteryLevel {
  margin-bottom: 10px;
}
</style>
