// Replaced by WebPack
const IS_DEV = process.env.NODE_ENV === 'development'
// const IS_TEST = process.env.NODE_ENV === 'testing'
const IS_PRODUCTION = process.env.NODE_ENV === 'production'

let settings = {
  MOSQUITTO_HOST: null
}

if (IS_DEV) {
  settings.MOSQUITTO_HOST = '10.20.31.31'
} else if (IS_PRODUCTION) {
  settings.MOSQUITTO_HOST = 'localhost'
} else {
  throw new Error('not yet implemented')
}

export { settings }
export const MOSQUITTO_HOST = settings.API_MOSQUITTO_HOSTBASE_URL
