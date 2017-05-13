<template>
  <div class="infobar row">
    <div class="mqtt-state col align-center" v-bind:class="{ 'mqtt-state-connected': isMqttConnected }">MQTT state: {{ getMqttState }}</div>

    <div class="software-update-available col" v-if="isSoftwareUpdateAvailable">
        <router-link to="/update">
          <button type="button" class="btn btn-success">Available Updates: 1</button>
        </router-link>
    </div>

    <div class="col">
      <button type="button" class="btn btn-default"  @click="toggleDevTools()">Dev Tools</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import * as types from '../store/mutation-types'

export default {
  computed: mapGetters([
    'getMqttState',
    'isMqttConnected',
    'isSoftwareUpdateAvailable'
  ]),
  methods: {
    toggleDevTools () {
      this.$store.commit(types.TOGGLE_GHOUST_DEV_TOOLS_VISIBLE)
    }
  },
  components: {
  }
}
</script>

<style>
.infobar {
  position: absolute;
  height: 64px;
  width: 100%;
  box-shadow: 0px 0px 17px -3px rgba(0,0,0,0.67);
  background-color: #F5F5F5;
  margin: 0;
}

.mqtt-state.mqtt-state-connected {
  color: green;
}
.software-update-available {
  margin: 20px 0px;
}
</style>
