// actions are functions that causes side effects and can involve
// asynchronous operations.

import * as types from './mutation-types'
// import * as consts from './constants'
// import { MOSQUITTO_HOST } from '../settings'

import Vue from 'vue'
import Resource from 'vue-resource'

Vue.use(Resource)

export const testAction = ({ commit, state }) => {
  commit(types.SET_IS_LOADING, true)
}
