<template>
  <div class="client-list-container">
    <transition-group mode="out-in" name="mqtt-view-switch">
      <div v-if="isMqttConnected" key="client-list">

        <transition name="slide-software-update">
          <div class="software-update-available col-md-12" v-if="isSoftwareUpdateAvailable">
            <router-link to="/update">
              <button type="button" class="update-button">Update!</button>
            </router-link>
          </div>
        </transition>

        <ClientList key="client-list"></ClientList>

      </div>

      <div v-else class="mqtt-state col align-center" key="mqqt-state">
        <p>{{ getMqttState.slice(11) }}</p>
      </div>

    </transition-group>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ClientList from '../components/ClientList'

export default {
  computed: mapGetters([
    'getClients',
    'getMqttState',
    'isMqttConnected',
    'isSoftwareUpdateAvailable'
  ]),

  methods: {
    ...mapActions([])
  },

  components: {
    ClientList
  }
}
</script>

<style>
.client-list-container {
  height: 80%;
  overflow-y: scroll;
  min-width: 100%;
  margin-bottom: 64px;
}

.software-update-available {
  box-shadow: 0 10px 17px -10px rgba(0,0,0,0.87);
  text-align: center;
  margin-bottom:0 !important;
  background-color: #414141;
}

.software-update-available .update-button {
    margin: 15px;
    background-color: #2ECC71;
    color: #ffffff;
    border: none;
    height: 2.5em;
    width: 9em;
    border-radius: 4px;
    transition: background-color .3s;
  }

.software-update-available .update-button:hover {
    background-color: rgba(46, 204, 113, 0.7);
}

.mqtt-view-switch {
  width:100%;
  position: relative;
}

.mqtt-state {
  width: 100%;
  margin-top: 20%;
  height: 256px;
  color: rgba(0, 0, 0, 0.18);
  font-size: 2em;
  font-weight: 700;
  text-align: center;
}
/* Transitions */

.slide-software-update-enter-active {
  transition: all .3s ease;
}
.slide-software-update-leave-active {
  transition: all .3s ease;
}

.slide-software-update-enter, .slide-dev-tools-leave-to {
  transform: translateY(-300px);
}

.mqtt-view-switch-enter-active, .mqtt-view-switch-leave-active {
  transition: opacity .5s ease;
}
.mqtt-view-switch-enter-active, .mqtt-view-switch-leave-to {
  opacity: 0;
}
</style>
