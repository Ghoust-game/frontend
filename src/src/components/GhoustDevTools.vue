<template>
    <div class="ghoust-dev-tools">
      <div style="margin:20px;" class="row">
        <span v-for="component in getSoftwareComponents" class='devtools-component-info'>
          <b>{{ component.name }}</b> (current={{ component.versionCurrent }}, latest={{ component.versionLatest }})
        </span>

        <div class="form-group form-inline col-sm-6">
          <label for="mqttUrl">MQTT Url:</label><br>
          <input type="text" id="mqttUrl" ref="mqttUrl" class="form-control" placeholder="MQTT URL" :value="getMqttUrl" /><br>
          <button type="submit" class="btn btn-primary" @click="setMqttUrl">Update</button>
        </div>

        <div class="col-sm-6">
          <label for="sendMqttTopic">Publish MQTT message:</label><br>
          <input type="text" id="sendMqttTopic" ref="sendMqttTopic" class="form-control" placeholder="MQTT topic" />
          <input type="text" id="sendMqttMessage" ref="sendMqttMessage" class="form-control" placeholder="MQTT message" />
          <button type="submit" class="btn btn-primary" @click="publishMqttMessage">Publish</button>
          Example messages:
            <a href="#" @click="setExampleMessageConnect">Connect</a>,
            <a href="#" @click="setExampleMessageOutshock">Event: Outshock</a>,
            <a href="#" @click="setExampleMessageBatteryDanger">Event: Battery Low</a>,
            <a href="https://github.com/Ghoust-game/docs/wiki/MQTT" target="_blank">more</a>
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import * as types from '../store/mutation-types'

export default {
  name: 'GhoustDevTools',
  computed: mapGetters([
    'ghoustDevToolsVisible',
    'getSoftwareComponents',
    'getMqttUrl'
  ]),
  methods: {
    setMqttUrl () {
      const url = this.$refs.mqttUrl.value
      console.log('set mqtt url', url)
      this.$store.commit(types.SET_MQTT_URL, url)
      this.$store.dispatch('restartMQTT')
    },

    publishMqttMessage (clientId) {
      const topic = this.$refs.sendMqttTopic.value
      const message = this.$refs.sendMqttMessage.value
      if (!topic) {
        window.alert('MQTT message needs a topic')
        return
      }
      console.log('send', topic, message)
      this.$store.dispatch('sendToClient', { topic, message })
    },

    setExampleMessageConnect () {
      this.$refs.sendMqttTopic.value = 'GHOUST/clients/GHOUST_77-68/status'
      this.$refs.sendMqttMessage.value = 'CONNECTED'
    },

    setExampleMessageOutshock () {
      this.$refs.sendMqttTopic.value = 'GHOUST/clients/GHOUST_77-68/events/accelerometer'
      this.$refs.sendMqttMessage.value = 'OUTSHOCK (25.514)'
    },

    setExampleMessageBatteryDanger () {
      this.$refs.sendMqttTopic.value = 'GHOUST/clients/GHOUST_77-68/events/battery'
      this.$refs.sendMqttMessage.value = '440'
    },

    ...mapActions([
    ])
  },
  components: {
  }
}
</script>

<style>
.ghoust-dev-tools {
  box-shadow: 0px 0px 17px -3px rgba(0,0,0,0.67);
  position: absolute;
  bottom: 0;
  height: 25vh;
  width: 100%;
  overflow-y: scroll;
  background-color: #E0E0E0;
  color: rgba(0,0,0,.87);
  z-index: 2;
}

.devtools-component-info {
  padding-left: 4px;
  padding-right: 4px;
}
</style>
