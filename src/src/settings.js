// Replaced by WebPack
export const IS_DEV = process.env.NODE_ENV === 'development'
// const IS_TEST = process.env.NODE_ENV === 'testing'
export const IS_PRODUCTION = process.env.NODE_ENV === 'production'

let settings = {
  MQTT_URL: false
}

if (IS_DEV) {
  settings.MQTT_URL = 'mqtt://10.20.30.105:1884'
  // settings.MQTT_URL = 'mqtt://10.20.32.173:1884'
  // settings.MQTT_URL = 'mqtt://10.20.31.143:1884'
} else if (IS_PRODUCTION) {
  // settings.MQTT_URL = 'mqtt://localhost:1884'
} else {
  throw new Error('not yet implemented')
}

export { settings }
export const MQTT_URL = settings.MQTT_URL
