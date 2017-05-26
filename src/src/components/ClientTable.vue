<template>
  <div class="client-table-container">
  <table class="client-table">
    <tr key="client-list-header">
      <th>Label</th>
      <th>Battery</th>
      <th>Wins</th>
      <th>Losses</th>
      <th>Controls</th>
    </tr>

    <tr key="client-list-item" v-bind:class="client.alive ? 'alive' : 'dead'"v-for="client in getClients">
      <td>
        <span v-bind:id="client.id + '-label'" @click="setLabel(client.id)">{{ client.label }}</span>
      </td>

      <td>{{ client.batteryLevel }}</td>
      <td>{{ client.wins }}</td>
      <td>{{ client.losses }}</td>
      <td class=".client-controls">
        <img src="/static/assets/ping_ghoust.svg" class="ping-button left-align" @click="setColorRed(client.id)"></img>
      </td>
    </tr>
  </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

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

        // this.$store.commit(types.SET_LABEL, { clientId, label })
        this.$store.dispatch('sendToClient', { topic: `GHOUST/clients/${clientId}/config/name`, message: label })
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
.client-table-container{
  padding: 16px;
  padding-top: 32px;
}

.client-table {
  box-shadow: 0px 0px 10px -2px rgba(0,0,0,0.67);
  border-radius: 4px;
  width: 100%;
  overflow: hidden;
}

.client-table tr {
  width:100%;
  color: #ffffff;
}

.client-table tr:nth-child(even).alive {
    background-color: #2ECC71;
}
.client-table tr:nth-child(odd).alive {
    background-color: #229955;
}

.client-table tr:nth-child(even).dead {
    background-color: #E74C3C;
}
.client-table tr:nth-child(odd).dead {
    background-color: #AD392D;
}

.client-table td {
    padding: 0 8px 0 8px;
}

.client-table th {
  background-color: #212121;
  padding: 0 8px 0 8px;
}

.client-controls {
  height: 48px;
  padding: 4px 8px 4px 12px;
  color: rgba(255, 255, 255, 0.9);
  z-index: -2;
  background-size: cover;
}

.client-table tr span {
  white-space: nowrap;
  overflow: hidden;
  font-size: 16px;
  padding: 0 4px 0 4px;
  font-weight: 700;
  border-radius: 4px;
  transition: background-color .3s;
}
.client-table tr span br {
  display: none; /* no line wrap hack */
}

.client-table tr span:hover {
  background-color: rgba(0, 0, 0, 0.10);
}

.client-table tr span:focus {
  background-color: rgba(0, 0, 0, 0.20);
}

.client-table tr .ping-button {
  background-size: cover;
  float: right;
  width: 30px;
  height: 30px;
  padding: 2px 0 4px 0;
  border-radius: 4px;
  transition: background-color .1s;
}

.client-table tr .ping-button:hover  {
  background-color: rgba(0, 0, 0, 0.10);
}

.client-table tr .ping-button:active  {
  background-color: rgba(0, 0, 0, 0.20);
}
</style>
