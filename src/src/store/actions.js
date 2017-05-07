// actions are functions that causes side effects and can involve
// asynchronous operations.

import * as types from './mutation-types'
import mqtt from 'mqtt'

import Vue from 'vue'
import Resource from 'vue-resource'
import * as consts from './constants'

Vue.use(Resource)

let mqttClient = null

export const startMQTT = ({ commit, state }) => {
  if (!state.mqttUrl) {
    const host = window.location.hostname
    commit(types.SET_MQTT_URL, `mqtt://${host}:1884`)
    console.log('set initial mqtt url', state.mqttUrl)
  }
  mqttClient = mqtt.connect(state.mqttUrl)
  commit(types.SET_MQTT_STATE, consts.MQTT_STATE_CONNECTING)
  console.log('mqtt connecting to ' + state.mqttUrl)

  mqttClient.on('connect', function () {
    console.log('mqtt connected')
    commit(types.SET_MQTT_STATE, consts.MQTT_STATE_CONNECTED)
    mqttClient.subscribe('#')
  })

  mqttClient.on('reconnect', function () {
    // reconnect starts
    console.info('mqtt reconnecting...')
    commit(types.SET_MQTT_STATE, consts.MQTT_STATE_CONNECTING)
  })

  mqttClient.on('close', function () {
    console.warn('mqtt disconnected')
    commit(types.SET_MQTT_STATE, consts.MQTT_STATE_OFFLINE)
  })

  mqttClient.on('offline', function () {
    console.warn('mqtt went offline')
    commit(types.SET_MQTT_STATE, consts.MQTT_STATE_OFFLINE)
  })

  mqttClient.on('error', function (error) {
    console.error('mqtt error', error)
    commit(types.SET_MQTT_ERROR, error)
    commit(types.SET_MQTT_STATE, consts.MQTT_STATE_ERROR)
  })

  mqttClient.on('message', function (topic, message) {
    // message is Buffer
    const msg = message.toString()
    console.log(`mqtt message received. topic: ${topic}, msg: ${msg}`)
    mqttMessageReceived({ commit, state }, { topic, msg })
  })
}

export const restartMQTT = ({ commit, state }) => {
  // Terminate an existing connection
  if (mqttClient) {
    mqttClient.end()
    mqttClient = null
  }

  // Remove old clients
  commit(types.CLIENTS_CLEAR)

  // Restart mqtt connection
  startMQTT({ commit, state })
}

export const mqttMessageReceived = ({ commit, state }, { topic, msg }) => {
  const topics = topic.split('/')
  console.log(topics)

  // Extract parts of the topic and process
  const topicType = topics[1]
  const clientId = topics[2]
  const clientTopic = topics[3]
  // console.log(clientId, 'clientTopic:', clientTopic, 'msg:', msg)

  if (topicType === 'server') {
    console.log('server msg', topics)

    const messageType = topics[2]
    const messageSubtype = topics[3]
    console.log('server type', messageType, 'subtype', messageSubtype)

    if (messageType === 'status' && messageSubtype === 'gamemodes') {
      const gameModes = msg.split(',')
      console.log('modes', gameModes)
      commit(types.SET_GAME_MODES, gameModes)
      return
    }

    if (messageType === 'status' && messageSubtype === 'activegames') {
      const gameInstances = msg.split(',').map((s) => {
        const [id, name] = s.split(':')
        return { id, name }
      })
      console.log('active games', gameInstances)
      commit(types.SET_GAME_INSTANCES, gameInstances)
      return
    }

    if (messageType === 'version') {
      const componentName = topics[3]
      const infoType = topics[4]
      if (infoType === 'current') {
        console.log('server version current', componentName, msg)
        commit(types.SET_SOFTWARE_COMPONENT_VERSION_CURRENT, {
          name: componentName,
          version: msg
        })
      } else if (infoType === 'latest') {
        console.log('server version latest', componentName, msg)
        commit(types.SET_SOFTWARE_COMPONENT_VERSION_LATEST, {
          name: componentName,
          version: msg
        })
      }
    }

    return
  }

  if (clientTopic === 'status') {
    if (msg === 'CONNECTED') {
      commit(types.CLIENT_ADD, clientId)
    } else if (msg === 'DISCONNECTED') {
      commit(types.CLIENT_REMOVE, clientId)
    }
  } else if (clientTopic === 'events') {
    const eventType = topics[4]
    console.log('event', eventType, 'value:', msg)

    if (eventType === 'battery') {
      commit(types.SET_BATTERY_LEVEL, { clientId, batteryLevel: msg })
    }
  }
}

export const sendToClient = ({ commit, state }, { topic, message }) => {
  console.log('sendMqttMessage', topic, message)
  mqttClient.publish(topic, message)
}

export const mqttStartGame = ({ commit, state }, gameMode) => {
  console.log('mqttStartGame', gameMode)
  mqttClient.publish('GHOUST/server/changegame', gameMode)
}
