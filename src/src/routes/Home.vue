<template>
  <div>
    <div class="mqtt-state" v-bind:class="{ 'mqtt-state-connected': isMqttConnected }">MQTT state: {{ getMqttState }}</div>
    <div v-if="isSoftwareUpdateAvailable" class="software-update-available">
      <router-link to="/update">
        <button type="button" class="btn btn-success">Available Updates: 1</button>
      </router-link>
    </div>

    <GhoustDevTools></GhoustDevTools>

    <GameModeList></GameModeList>
    <GameInstanceList></GameInstanceList>

    <Overview></Overview>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Overview from '../components/Overview'
import GameModeList from '../components/GameModeList'
import GameInstanceList from '../components/GameInstanceList'
import GhoustDevTools from '../components/GhoustDevTools'

export default {
  computed: mapGetters([
    'getMqttState',
    'isMqttConnected',
    'isSoftwareUpdateAvailable'
  ]),
  components: {
    Overview, GameModeList, GameInstanceList, GhoustDevTools
  }
}
</script>

<style>
</style>
