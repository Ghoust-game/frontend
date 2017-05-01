// actions are functions that causes side effects and can involve
// asynchronous operations.

import * as types from './mutation-types'
import { MOSQUITTO_URL } from '../settings'
import mqtt from 'mqtt'

import Vue from 'vue'
import Resource from 'vue-resource'

Vue.use(Resource)

let mqttClient = null

export const testAction = ({ commit, state }) => {
  commit(types.SET_IS_LOADING, true)
}

export const startMQTT = ({ commit, state }) => {
  console.log('start')
  mqttClient = mqtt.connect(MOSQUITTO_URL)

  mqttClient.on('connect', function () {
    mqttClient.subscribe('#')
    // client.publish('presence', 'Hello mqtt')
  })

  mqttClient.on('message', function (topic, message) {
    // message is Buffer
    const msg = message.toString()
    console.log(topic, msg)

    const topics = topic.split('/')
    // console.log(topics)

    // Extract parts of the topic and process
    const clientId = topics[2]
    const clientTopic = topics[3]
    console.log(clientId, 'clientTopic:', clientTopic, 'msg:', msg)

    if (clientTopic === 'status') {
      if (msg === 'CONNECTED') {
        commit(types.CLIENT_ADD, clientId)
      } else if (msg === 'DISCONNECTED') {
        commit(types.CLIENT_REMOVE, clientId)
      }
    } else if (clientTopic === 'events') {
      console.log('event', topics[4], 'value:', msg)
      commit(types.SET_BATTERY_LEVEL, { clientId, batteryLevel: msg })
    }
  })
}

export const sendToClient = ({ commit, state }, { topic, message }) => {
  console.log('sendMqttMessage', topic, message)
  mqttClient.publish(topic, message)
}
