import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as types from './mutation-types'
import * as consts from './constants'
import { MQTT_URL } from '../settings'

Vue.use(Vuex)

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  // ui state
  isLoading: false,
  clients: [],
  mqttState: consts.MQTT_STATE_OFFLINE,
  mqttError: null,
  mqttUrl: MQTT_URL,
  gameModes: [],
  gameInstances: [],
  ghoustDevToolsVisible: false,

  // Messages from the updater service
  softwareCurrentVersion: '1',
  softwareLatestVersion: ''
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

  [types.SET_MQTT_URL] (state, url) {
    state.mqttUrl = url
  },

  [types.TOGGLE_GHOUST_DEV_TOOLS_VISIBLE] (state) {
    state.ghoustDevToolsVisible = !state.ghoustDevToolsVisible
  },

  [types.CLIENTS_CLEAR] (state) {
    state.clients = []
  },

  [types.SET_GAME_MODES] (state, gameModes) {
    state.gameModes = gameModes
  },

  [types.SET_VERSION_CURRENT] (state, versionCurrent) {
    state.softwareCurrentVersion = versionCurrent
  },

  [types.SET_VERSION_LATEST] (state, versionLatest) {
    state.softwareCurrentVersion = versionLatest
  },

  [types.SET_GAME_INSTANCES] (state, gameInstances) {
    state.gameInstances = gameInstances
  }
}

// getters are functions
const getters = {
  isLoading: state => state.isLoading,
  ghoustDevToolsVisible: state => state.ghoustDevToolsVisible,
  // currentRoutePath: state => state.route.fullPath,

  getClients: state => state.clients,

  isMqttConnected: state => state.mqttState === consts.MQTT_STATE_CONNECTED,
  getMqttState: state => state.mqttState,
  getMqttError: state => state.mqttError,
  getMqttUrl: state => state.mqttUrl,

  getGameModes: state => state.gameModes,
  getGameInstances: state => state.gameInstances,
  getSoftwareCurrentVersion: state => state.softwareCurrentVersion,
  getSoftwareLatestVersion: state => state.softwareLatestVersion,
  isSoftwareUpdateAvailable: (state) => {
    return state.softwareCurrentVersion !== state.softwareLatestVersion
  }
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
