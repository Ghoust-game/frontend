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
  clientViewType: consts.CLIENT_LIST_VIEW_TYPE_TABLE,
  mqttState: consts.MQTT_STATE_OFFLINE,
  mqttError: null,
  mqttUrl: MQTT_URL,
  gameModes: [],
  gameInstances: [],
  ghoustDevToolsVisible: false,

  // Messages from the updater service
  softwareComponents: [],
  softwareIsInstallingUpdate: false
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
      extended: false,
      alive: true, // hacky implementation
      batteryLevel: '?',
      wins: 0, // hacky implementation
      losses: 0 // hacky implementation
    }
    state.clients.push(client)
  },

  [types.CLIENT_REMOVE] (state, clientId) {
    state.clients = state.clients.filter((client) => {
      return client.id !== clientId
    })
  },

  [types.TOGGLE_CLIENT_EXTENDED] (state, { clientId, batteryLevel }) {
    state.clients.forEach((client, i) => {
      if (client.id === clientId) {
        client.extended = !client.extended
        Vue.set(state.clients, i, client)
        return
      }
    })
  },

  [types.CLIENT_WIN] (state, clientId) {
    for (var i = 0; i < state.clients.length; i++) {
      const client = state.clients[i]
      client.alive = true
      if (client.id === clientId) {
        client.wins++
      }
      Vue.set(state.clients, i, client)
    }
    return
  },

  [types.CLIENT_LOSE] (state, clientId) {
    for (var i = 0; i < state.clients.length; i++) {
      if (state.clients[i].id === clientId) {
        const client = state.clients[i]
        client.losses++
        client.alive = false
        Vue.set(state.clients, i, client)
        return
      }
    }
  },

  [types.SET_LABEL] (state, { clientId, label }) {
    state.clients.forEach((client, i) => {
      if (client.id === clientId) {
        client.label = label
        Vue.set(state.clients, i, client)
        return
      }
    })
  },

  [types.SET_BATTERY_LEVEL] (state, { clientId, batteryLevel }) {
    state.clients.forEach((client, i) => {
      if (client.id === clientId) {
        client.batteryLevel = batteryLevel
        Vue.set(state.clients, i, client)
        return
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

  [types.SET_CLIENT_VIEW_TYPE] (state, viewType) {
    state.clientViewType = viewType
  },

  [types.CLIENTS_CLEAR] (state) {
    state.clients = []
  },

  [types.SET_GAME_MODES] (state, gameModes) {
    state.gameModes = gameModes
  },

  [types.SET_GAME_INSTANCES] (state, gameInstances) {
    state.gameInstances = gameInstances
  },

  // [types.SET_VERSION_CURRENT] (state, versionCurrent) {
  //   state.softwareCurrentVersion = versionCurrent
  // },

  [types.SET_SOFTWARE_COMPONENT_VERSION_CURRENT] (state, { name, version }) {
    for (var i = 0; i < state.softwareComponents.length; i++) {
      if (state.softwareComponents[i].name === name) {
        const component = state.softwareComponents[i]
        component.versionCurrent = version
        Vue.set(state.softwareComponents, i, component)
        return
      }
    }

    state.softwareComponents.push({
      name,
      versionCurrent: version
    })
  },

  [types.SET_SOFTWARE_COMPONENT_VERSION_LATEST] (state, { name, version }) {
    // for (let component of state.softwareComponents) {
    for (var i = 0; i < state.softwareComponents.length; i++) {
      if (state.softwareComponents[i].name === name) {
        const component = state.softwareComponents[i]
        component.versionLatest = version
        Vue.set(state.softwareComponents, i, component)
        return
      }
    }

    state.softwareComponents.push({
      name,
      versionLatest: version
    })
  },

  [types.SET_IS_INSTALLING_UPDATE] (state, isInstallingUpdate) {
    state.softwareIsInstallingUpdate = isInstallingUpdate
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
  getSoftwareComponents: state => state.softwareComponents,
  isSoftwareUpdateAvailable: (state) => {
    // console.log(state)
    for (let component of state.softwareComponents) {
      // console.log(component.name, component.versionCurrent, component.versionLatest)
      if (!component.versionCurrent || !component.versionLatest) {
        // if only one property is received yet, don't update
        continue
      }

      if (component.versionCurrent !== component.versionLatest) {
        return true
      }
    }
    return false
  },
  isInstallingUpdate: state => state.softwareIsInstallingUpdate
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
