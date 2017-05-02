# Ghoust Frontend

[![Build Status](https://travis-ci.org/Ghoust-game/frontend.svg?branch=master)](https://travis-ci.org/Ghoust-game/frontend)

Web frontend for the ghoust game. Interacts with the system via [MQTT](http://mqtt.org/). Uses:

* [Vue.js](https://vuejs.org/) and [vuex](https://vuex.vuejs.org/en/intro.html)
* Official [mqtt.js client](https://www.npmjs.com/package/mqtt) npm library


# Getting started

First, change into the `src` directory:

    $ cd src

Install the dependencies and start the dev server:

    # Install dependencies with yarn or npm
    $ npm install  # or `yarn`

    # run the dev server with hot reload at localhost:8080
    $ npm run dev

### MQTT Broker

For testing and development it may be useful to run a local [Mosquitto MQTT broker](https://mosquitto.org/) for the web frontend to connect to. Be sure to enable the websocket protocol in the Mosquitto config, and to point the JavaScript client to that broker (see [src/settings.js](https://github.com/Ghoust-game/frontend/blob/master/src/src/settings.js)).

### Vue DevTools

It is recommended to install the Chrome developer tools [Vue.js plugin](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)

### Keyboard shortcuts:

* `d` for ghoust developer tools
* `1`, `2`, `3`, `0` to publish [pre-defined mqtt messages](https://github.com/Ghoust-game/frontend/blob/master/src/src/App.vue#L24)

### More commands:

    # build for production with minification
    # production build will be saved in src/dist/
    $ npm run build

    # run unit tests
    $ npm run unit

    # run e2e tests
    $ npm run e2e

    # run all tests
    $ npm test


# MQTT

[MQTT](http://mqtt.org/) is an extremely lightweight publish/subscribe messaging system.

For list of topics and events, see https://github.com/Ghoust-game/ghoust/wiki/MQTT-tree
