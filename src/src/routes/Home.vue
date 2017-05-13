<template>
  <div>
    <div id="main-view">
      <div class="mqtt-state" v-bind:class="{ 'mqtt-state-connected': isMqttConnected }">MQTT state: {{ getMqttState }}</div>
      <div v-if="isSoftwareUpdateAvailable" class="software-update-available">
        <router-link to="/update">
          <button type="button" class="btn btn-success">Available Updates: 1</button>
        </router-link>
      </div>
      <GameInstanceList></GameInstanceList>
      <GameModeList></GameModeList>

      <Overview></Overview>
    </div>

    <!-- The best way i could find to do this animation since vue hides element after transitions automtically -->
    <transition-group name="slide-info-bar" :run="ghoustDevToolsVisible">
      <InfoBar v-if="ghoustDevToolsVisible" key="infoBar" class="infobar-animated"></InfoBar>
      <GhoustDevTools v-if="ghoustDevToolsVisible" key="ghoustDevTools"></GhoustDevTools>
    </transition-group>

    <InfoBar class="infobar-static" v-show="!ghoustDevToolsVisible"></InfoBar>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Overview from '../components/Overview'
import GameModeList from '../components/GameModeList'
import GameInstanceList from '../components/GameInstanceList'
import GhoustDevTools from '../components/GhoustDevTools'
import InfoBar from '../components/InfoBar'

export default {
  computed: mapGetters([
    'getMqttState',
    'isMqttConnected',
    'isSoftwareUpdateAvailable',
    'ghoustDevToolsVisible'
  ]),
  components: {
    Overview, GameModeList, GameInstanceList, GhoustDevTools, InfoBar
  }
}
</script>


<style>
body {
  overflow: hidden;
}
#main-view{
  padding: 20px 40px;
}

.infobar-static {
  bottom: 0;
  z-index: -1;
}
.infobar-animated {
  bottom: 20%;
}

.slide-info-bar-enter-active {
  transition: all .3s ease;
}
.slide-info-bar-leave-active {
  transition: all .5s ease;
}
.slide-info-bar-enter, .slide-info-bar-leave-to {
  transform: translateY(20vh);
}
</style>
