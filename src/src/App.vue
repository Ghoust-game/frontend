<template>
  <div id="app">
    <header>
      <h1>Ghoust Game</h1>
      <div class="mqtt-state" v-bind:class="{ 'mqtt-state-connected': isMqttConnected }">MQTT state: {{ getMqttState }}</div>
    </header>

    <GhoustDevTools></GhoustDevTools>

    <Overview></Overview>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import GhoustDevTools from './components/GhoustDevTools'
import Overview from './components/Overview'

import * as types from './store/mutation-types'
import * as Mousetrap from 'mousetrap'

export default {
  computed: mapGetters([
    'currentRoutePath',
    'getMqttState',
    'isMqttConnected'
  ]),

  components: {
    GhoustDevTools,
    Overview
  },

  created: function () {
    // start MQTT client
    this.$store.dispatch('startMQTT')

    // register for keyboard events
    Mousetrap.bind(['d'], () => {
      this.$store.commit(types.TOGGLE_GHOUST_DEV_TOOLS_VISIBLE)
      return false
    })
  }
}
</script>

<style>
#app {
  margin: 20px 40px;
}

.mqtt-state.mqtt-state-connected {
  color: green;
}
</style>
