<template>
  <div id="app">
    <header>
      <h1>Ghoust Game</h1>
      <div class="mqtt-state" v-bind:class="{ 'mqtt-state-connected': isMqttConnected }">MQTT state: {{ getMqttState }}</div>
    </header>

    <GhoustDevTools></GhoustDevTools>

    <div id="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import GhoustDevTools from './components/GhoustDevTools'
import * as types from './store/mutation-types'
import * as Mousetrap from 'mousetrap'

export default {
  computed: mapGetters([
    'currentRoutePath',
    'getMqttState',
    'isMqttConnected'
  ]),
  components: {
    GhoustDevTools
  },
  created: function () {
    // `this` points to the vm instance. You can access the state store with `this.$store`

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

#content {
}

.mqtt-state.mqtt-state-connected {
  color: green;
}
</style>
