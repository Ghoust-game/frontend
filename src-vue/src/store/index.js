import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as types from './mutation-types'
// import * as consts from './constants'

Vue.use(Vuex)

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  // ui state
  isLoading: false
}

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  [types.SET_IS_LOADING] (state, isLoading) {
    state.isLoading = isLoading
  }
}

// getters are functions
const getters = {
  isLoading: state => state.isLoading,
  currentRoutePath: state => state.route.fullPath
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
