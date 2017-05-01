// Replaced by WebPack
const IS_DEV = process.env.NODE_ENV === 'development'
// const IS_TEST = process.env.NODE_ENV === 'testing'
const IS_PRODUCTION = process.env.NODE_ENV === 'production'

let settings = {
  MOSQUITTO_URL: 'mqtt://10.20.31.31:1884'
}

if (IS_DEV) {
  settings.MOSQUITTO_URL = 'mqtt://10.20.31.31:1884'
} else if (IS_PRODUCTION) {
  settings.MOSQUITTO_URL = 'mqtt://localhost:1884'
} else {
  throw new Error('not yet implemented')
}

export { settings }
export const MOSQUITTO_URL = settings.MOSQUITTO_URL
