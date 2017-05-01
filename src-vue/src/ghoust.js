import { MOSQUITTO_URL } from './settings'
import * as types from './store/mutation-types'
import mqtt from 'mqtt'

export const GhoustApi = function (vm) {
  console.log(vm)
  const client = mqtt.connect(MOSQUITTO_URL)

  client.on('connect', function () {
    client.subscribe('#')
    // client.publish('presence', 'Hello mqtt')
  })

  client.on('message', function (topic, message) {
    // message is Buffer
    const msg = message.toString()
    console.log(topic, msg)

    const topics = topic.split('/')
    // console.log(topics)
    const clientId = topics[2]
    const clientTopic = topics[3]
    console.log(clientId, 'clientTopic:', clientTopic, 'msg:', msg)

    if (clientTopic === 'status') {
      if (msg === 'CONNECTED') {
        vm.$store.commit(types.CLIENT_ADD, clientId)
      } else if (msg === 'DISCONNECTED') {
        // vm.$store.commit(types.CLIENT_REMOVE, clientId)
      }
    }
  })
}
