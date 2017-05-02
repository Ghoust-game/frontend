<template>
    <div class="ghoust-dev-tools" v-show="ghoustDevToolsVisible">
      <h3>Ghoust DevTools</h3>
      <div style="margin:20px;">
          <label for="sendMqttMessage">Publish MQTT message:</label><br>
          <input type="text" id="sendMqttTopic" ref="sendMqttTopic" class="form-control" placeholder="MQTT topic" />
          <input type="text" id="sendMqttMessage" ref="sendMqttMessage" class="form-control" placeholder="MQTT message" />
          <button type="submit" class="btn btn-primary" @click="publishMqttMessage">Publish</button>
          Example messages:
            <a href="#" @click="setExampleMessageConnect">Connect</a>,
            <a href="#" @click="setExampleMessageOutshock">Event: Outshock</a>,
            <a href="#" @click="setExampleMessageBatteryDanger">Event: Battery Low</a>,
            <a href="https://github.com/Ghoust-game/ghoust/wiki/MQTT-tree" target="_blank">more</a>
      </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: mapGetters([
    'ghoustDevToolsVisible'
  ]),
  methods: {
    publishMqttMessage (clientId) {
      const topic = this.$refs.sendMqttTopic.value
      const message = this.$refs.sendMqttMessage.value
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
</style>
