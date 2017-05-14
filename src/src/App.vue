<template>
  <div id="app">
    <header>
      <router-link class="title-route" to="/"><span class="title-text align-middle">Ghoust Game</span></router-link>
    </header>

    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import * as types from './store/mutation-types'
import * as Mousetrap from 'mousetrap'
import GhoustDevTools from './components/GhoustDevTools'

// hotkeys for sending mqtt messages. property is the hotkey, argument is [topic, message]
const HOTKEY_MESSAGES = {
  '1': ['GHOUST/clients/GHOUST_77-68/status', 'CONNECTED'],    // connected
  '0': ['GHOUST/clients/GHOUST_77-68/status', 'DISCONNECTED'],    // connected
  '2': ['GHOUST/clients/GHOUST_77-68/events/battery', '440'],  // battery low
  '3': ['GHOUST/clients/GHOUST_77-68/events/accelerometer', 'OUTSHOCK (25.514)'],  // outshock
  '4': ['GHOUST/clients/GHOUST_77-68/config/led', 'PRESET:1']  // rainbow
}

export default {
  computed: mapGetters([
    'getMqttState',
    'isMqttConnected',
    'isSoftwareUpdateAvailable'
  ]),

  components: {
    GhoustDevTools
  },

  created: function () {
    // start MQTT client
    this.$store.dispatch('startMQTT')

    // register for keyboard events
    Mousetrap.bind(['x'], () => {
      this.$store.dispatch('sendToClient', {
        topic: 'GHOUST/server/version/test/latest',
        message: '123'
      })
      return false
    })

    Mousetrap.bind(['d'], () => {
      this.$store.commit(types.TOGGLE_GHOUST_DEV_TOOLS_VISIBLE)
      return false
    })

    Mousetrap.bind(['r'], () => {
      function getRandomInt (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
      }

      const randInt = getRandomInt(10, 99)
      let topic = 'GHOUST/clients/GHOUST_' + randInt + '-' + randInt + '/status'
      let message = 'CONNECTED'
      this.$store.dispatch('sendToClient', { topic, message })

      topic = 'GHOUST/clients/GHOUST_' + randInt + '-' + randInt + '/events/battery'
      message = getRandomInt(0, 1200).toString()
      this.$store.dispatch('sendToClient', { topic, message })
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
header {
  text-align: center;
  font-weight: 900;
  font-size: 100%;
  width: 100%;
  height: 10vh;
  background: #212121;
  z-index: 5;
}

.title-route {
  position: absolute;
  left: 0;
  height: 10vh;
  width: 100%;
  text-decoration: none !important;
}

.title-text {
  color: rgba(255, 255, 255, 0.9) !important;
  font-size: 6.5vh;
}
</style>
