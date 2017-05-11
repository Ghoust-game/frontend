<template>
  <div>

    <div class="ghoust-dev-tools" v-show="ghoustDevToolsVisible">
      <h3>Developer Tools</h3>
      <div style="margin:20px;">
      <span v-for="component in getSoftwareComponents" class='devtools-component-info'>
        <b>{{ component.name }}</b> (current={{ component.versionCurrent }}, latest={{ component.versionLatest }})
      </span>

        <hr>

        <div class="form-group form-inline">
          <label for="mqttUrl">MQTT Url:</label>
          <input type="text" id="mqttUrl" ref="mqttUrl" class="form-control" placeholder="MQTT URL" :value="getMqttUrl" />
          <button type="submit" class="btn btn-primary" @click="setMqttUrl">Update</button>
        </div>

        <hr>

        <div>
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
  padding: 20px 0px;
}

.devtools-component-info {
  padding-left: 4px;
  padding-right: 4px;
}
</style>
