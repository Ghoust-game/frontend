import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as types from './mutation-types'
import * as consts from './constants'

Vue.use(Vuex)

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  // ui state
  isLoading: false,
  clients: [],
  mqttState: consts.MQTT_STATE_OFFLINE,
  mqttError: null,
  ghoustDevToolsVisible: false
}

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  [types.CLIENT_ADD] (state, clientId) {
    // Only add if not existing
    for (let client of state.clients) {
      if (client.id === clientId) {
        return
      }
    }

    const client = {
      id: clientId,
      label: clientId,
      batteryLevel: '?'
    }
    state.clients.push(client)
  },

  [types.CLIENT_REMOVE] (state, clientId) {
    state.clients = state.clients.filter((client) => {
      return client.id !== clientId
    })
  },

  [types.SET_LABEL] (state, { clientId, label }) {
    state.clients.forEach((client) => {
      if (client.id === clientId) {
        client.label = label
      }
    })
  },

  [types.SET_BATTERY_LEVEL] (state, { clientId, batteryLevel }) {
    state.clients.forEach((client) => {
      if (client.id === clientId) {
        client.batteryLevel = batteryLevel
      }
    })
  },

  [types.SET_MQTT_STATE] (state, mqttState) {
    state.mqttState = mqttState
  },

  [types.SET_MQTT_ERROR] (state, error) {
    state.mqttError = error
  },

  [types.SET_GHOUST_DEV_TOOLS_VISIBLE] (state, isVisible) {
    state.ghoustDevToolsVisible = isVisible
  },

  [types.TOGGLE_GHOUST_DEV_TOOLS_VISIBLE] (state) {
    state.ghoustDevToolsVisible = !state.ghoustDevToolsVisible
  }
}

// getters are functions
const getters = {
  isLoading: state => state.isLoading,
  ghoustDevToolsVisible: state => state.ghoustDevToolsVisible,
  currentRoutePath: state => state.route.fullPath,

  getClients: state => state.clients,

  isMqttConnected: state => state.mqttState === consts.MQTT_STATE_CONNECTED,
  getMqttState: state => state.mqttState,
  getMqttError: state => state.mqttError
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
