<template>
  <div class="client-list-container" v-if="isMqttConnected">
    <ul class="client-list row">
      <li class="client-list-item col-md-4" v-for="client in getClients">
        <div class="client-container">

          <div class="client-controls" v-bind:style="getClientStyle(client)">
            <span v-bind:id="client.id + '-label'" @click="setLabel(client.id)">{{ client.label }}</span>
            <img src="/static/assets/ping_ghoust.svg" class="ping-button left-align" @click="setColorRed(client.id)"></img>
          </div>

          <div class="client-stats row">
            <span class="client-wins col text-center">Wins: {{ client.wins }}</span>
            <span class="client-losses col text-center">Losses: {{ client.losses }}</span>
          </div>

        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import * as types from '../store/mutation-types'

export default {
  computed: mapGetters([
    'getClients',
    'isMqttConnected'
  ]),

  methods: {
    setLabel (clientId) {
      let textDom = document.getElementById(clientId + '-label')
      textDom.contentEditable = true
      let label = clientId

      textDom.onblur = () => {
        textDom.contentEditable = false
        label = textDom.innerText.replace(/(\r\n|\n|\r)/gm, '')
        if (label === '') {
          label = clientId
        }
        textDom.innerText = label
        this.$store.commit(types.SET_LABEL, { clientId, label })
      }
    },
    getClientStyle (client) {
      const solidColor = client.alive ? '#2ECC71' : '#E74C3C'
      const alphaColor = client.alive ? 'rgba(46, 204, 113, 0.7)' : 'rgba(231, 76, 60, 0.7)'

      if (client.batteryLevel !== '?') {
        let batteryPercentage = Math.floor(((client.batteryLevel / 1200) * 100)) + '%' // I don't know what the max. battery level is

        return { background: 'linear-gradient(to left, ' +
                  solidColor + ', ' + solidColor + ' ' +
                    batteryPercentage + ', ' + alphaColor + ' ' +
                      batteryPercentage + ', ' + alphaColor + ' )' } // sry
      } else {
        return { background: alphaColor }
      }
    },
    setColorRed (clientId) {
      console.log('set color to red')
      this.$store.dispatch('sendToClient', { topic: `GHOUST/clients/${clientId}/config/led`, message: 'RAW:1023,0,0,2000' })
    },

    ...mapActions([])
  },

  components: {
  }
}
</script>

<style>
.client-list-container{
  height: 80%;
  overflow-y: scroll;
  min-width: 100%;
  margin: 0px 15px 64px 0;
}

.client-list {
  padding: 15px 0 15px 0;
  margin: 0 !important;
}

.client-list-item {
  margin-bottom: 16px;
}

.client-container {
  box-shadow: 0px 0px 10px -2px rgba(0,0,0,0.67);
  height: 72px;
  padding: 0 !important;
  border-radius: 4px 4px 4px 4px;
  overflow: hidden;
  background-color: #212121;
}

.client-controls {
  height: 48px;
  padding: 6px 8px 6px 12px;
  color: rgba(255, 255, 255, 0.9);
  z-index: -2;
  background-size: cover;
}

.client-controls span {
  white-space: nowrap;
  font-size: 24px;
  font-weight: 900;
  height: 16px;
}
.client-controls .ping-button {
  background-size: cover;
  float: right;
  width: 32px;
  height: 32px;
}

.client-stats .client-wins{
  color: #FFC107;
}
.client-stats .client-losses {
  color: #E74C3C;
}
</style>
