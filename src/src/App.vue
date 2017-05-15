<template>
  <div id="app">
    <header>
      <router-link class="title-route" to="/"><span class="title-text align-middle">Ghoust Game</span></router-link>
    </header>

    <div class="main-view ">
      <div class="subheader row">
        <!-- <GameInstanceList class="col"></GameInstanceList> disabled until implemented -->
        <GameModeList class="col"></GameModeList>
      </div>

      <div class="router-container">
       <transition name="fade-router" mode="out-in">
        <router-view></router-view>
       </transition>
      </div>
      <!-- The best way i could find to do this animation since vue hides element after transitions automtically -->
      <transition name="slide-dev-tools">
        <GhoustDevTools v-if="ghoustDevToolsVisible"></GhoustDevTools>
      </transition>

    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as types from './store/mutation-types'
import * as Mousetrap from 'mousetrap'
import GameModeList from './components/GameModeList'
import GameInstanceList from './components/GameInstanceList'
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
    'ghoustDevToolsVisible',
    'getMqttState',
    'isMqttConnected',
    'isSoftwareUpdateAvailable'
  ]),

  components: {
    GameModeList, GameInstanceList, GhoustDevTools
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
body {
  overflow: hidden;
}
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

.main-view {
  position: absolute;
  top: 10%;
  height: 90%;
  width: 100%;
}

.subheader {
  height: 20%;
  width:100%;
  background-color: #212121;
  z-index: 4;
  display: table;
  table-layout: fixed;
  margin: 0 !important;
  color: rgba(255, 255, 255, 0.9);
  padding: 16px 16px 16px 16px;
}

.router-container {
  box-shadow: inset -5px 5px 25px rgba(0,0,0,0.87);
  height:100%;
  margin-right: -15px;
}

.subheader .col {
  padding: 0 0 0 0;
}

.slide-dev-tools-enter-active {
  transition: all .3s ease;
}
.slide-dev-tools-leave-active {
  transition: all .5s ease;
}
.slide-dev-tools-enter, .slide-dev-tools-leave-to {
  transform: translateY(25vh);
}


.fade-router-enter-active {
  transition: all .3s ease;
}
.fade-router-leave-active {
  transition: all .5s ease;
}
.fade-router-enter, .fade-router-leave-to {
  opacity: 0;
}
</style>
