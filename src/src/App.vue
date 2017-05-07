<template>
  <div id="app">
    <header>
      <h1>Ghoust Game</h1>
      <div class="mqtt-state" v-bind:class="{ 'mqtt-state-connected': isMqttConnected }">MQTT state: {{ getMqttState }}</div>
    </header>

    <GhoustDevTools></GhoustDevTools>

    <GameModeList></GameModeList>
    <GameInstanceList></GameInstanceList>

    <Overview></Overview>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import GhoustDevTools from './components/GhoustDevTools'
import Overview from './components/Overview'
import GameModeList from './components/GameModeList'
import GameInstanceList from './components/GameInstanceList'

import * as types from './store/mutation-types'
import * as Mousetrap from 'mousetrap'

// hotkeys for sending mqtt messages. property is the hotkey, argument is [topic, message]
const HOTKEY_MESSAGES = {
  '1': ['GHOUST/clients/GHOUST_77-68/status', 'CONNECTED'],    // connected
  '0': ['GHOUST/clients/GHOUST_77-68/status', 'DISCONNECTED'],    // connected
  '2': ['GHOUST/clients/GHOUST_77-68/events/battery', '440'],  // battery low
  '3': ['GHOUST/clients/GHOUST_77-68/events/accelerometer', 'OUTSHOCK (25.514)']  // outshock
}

export default {
  computed: mapGetters([
    'getMqttState',
    'isMqttConnected'
  ]),

  components: {
    GhoustDevTools,
    Overview,
    GameModeList,
    GameInstanceList
  },

  created: function () {
    // start MQTT client
    this.$store.dispatch('startMQTT')

    // register for keyboard events
    Mousetrap.bind(['d'], () => {
      this.$store.commit(types.TOGGLE_GHOUST_DEV_TOOLS_VISIBLE)
      return false
    })

    // bind hotkeys
    for (let k in HOTKEY_MESSAGES) {
      Mousetrap.bind(k, () => {
        const [topic, message] = HOTKEY_MESSAGES[k]
        this.$store.dispatch('sendToClient', { topic, message })
        return false
      })
    }
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
