<template>
  <ul transition-duration="0.3s" class="client-list">
    <li class="client-list-item" v-for="client in getClients">
      <div class="client-container">

        <div class="client-controls" v-bind:style="getClientStyle(client)">
          <span v-bind:id="client.id + '-label'" @click="setLabel(client.id)">{{ client.label }}</span>
          <img src="/static/assets/ping_ghoust.svg" class="ping-button left-align" @click="setColorRed(client.id)"></img>
        </div>

        <div class="client-stats">
          <div class="client-wins">Wins: {{ client.wins }}</div>
          <div class="client-losses">Losses: {{ client.losses }}</div>
          <div class="client-graph">Coming Soon</div>
        </div>

      </div>
    </li>
  </ul>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import * as types from '../store/mutation-types'

export default {
  computed: mapGetters([
    'getClients'
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
.client-list {
  padding: 15px 0 15px 0;
  margin: 0 !important;
  display: flex;
  flex-wrap: wrap;
}

.client-list-item {
  padding: 16px;
  width: 33.3%;
}
@media (max-width: 900px) {
  .client-list-item {
    width: 100%;
  }
}

.client-container {
  box-shadow: 0px 0px 10px -2px rgba(0,0,0,0.67);
  height: 72px;
  border-radius: 4px 4px 4px 4px;
  overflow: hidden;
  background-color: #212121;
  transition: height .3s ease;
}

.client-container:hover {
  height: 280px;
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
  overflow: hidden;
  font-size: 24px;
  font-weight: 900;
  padding: 4px;
  border-radius: 4px;
  transition: background-color .3s;
}
.client-controls span br {
  display: none; /* no line wrap hack */
}

.client-controls span:hover {
  background-color: rgba(0, 0, 0, 0.10);
}

.client-controls span:focus {
  background-color: rgba(0, 0, 0, 0.20);
}

.client-controls .ping-button {
  background-size: cover;
  float: right;
  width: 40px;
  height: 40px;
  margin: -2px 0 0 0;
  padding: 2px 0 4px 0;
  border-radius: 4px;
  transition: background-color .1s;
}

.client-controls .ping-button:hover  {
  background-color: rgba(0, 0, 0, 0.10);
}

.client-controls .ping-button:active  {
  background-color: rgba(0, 0, 0, 0.20);
}

.client-stats {
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.client-stats .client-wins{
  color: #FFC107;
  width: 50%;
}
.client-stats .client-losses {
  color: #E74C3C;
  width: 50%;
}
.client-stats .client-graph {
  color: rgba(255, 255, 255, 0.5);
  width: 100%;
  height: 208px;
  text-align: center;
}
</style>
