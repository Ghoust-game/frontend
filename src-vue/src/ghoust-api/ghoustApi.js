import { mqtt } from 'mqtt';

export const GhoustApi = function (config) {
  var handleClientMessage = function (clientID, clientTopic, value) {
    switch (clientTopic[0]) {
      case 'status':
        if (value === 'CONNECTED') {
          var newPlayer = {
            id: clientID,
            name: ' -- ',
            alive: true
          }
          players.push(newPlayer)
          config.onClientConnected(newPlayer, players)
        } else if (value === 'DISCONNECTED') {
          // players = _.without(players, _.where(players, { id: clientID }));
        }
        break
      case 'events':
        config.onClientEvent(clientID, clientTopic[1], value)
        break
      default:

    }
  }

  var handleMessage = function (msg) {
    const topic = msg.destinationName.split('/')
    switch (topic[1]) {
      case 'clients':
        handleClientMessage(topic[2], topic.slice(3, topic.length), msg.payloadString)
        break
      case 'server':
        break
      default: log('Topic not Implemented: ' + msg.destinationName)
    }
  }

  var log = function (str) {
    if (config.verbose) { console.log(str) }
  }

  var onConnect = function () {
    log('Connected: ' + client.host + ':' + client.port)
    client.subscribe('GHOUST/#')
  }

  var onMessageArrived = function (msg) {
    log(client.host + ':' + client.port + '/' + msg.destinationName + ': ' + msg.payloadString)
    handleMessage(msg)
  }

  var onConnectionLost = function (res) {
    log('Disconnected: ' + res.errorMessage)
  }

  var players = []
  var client = new Paho.MQTT.Client(config.hostname, Number(config.port), '', '/')
  client.onConnectionLost = onConnectionLost
  client.onMessageArrived = onMessageArrived

  client.connect({ onSuccess: onConnect })
}
