// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store'
// import VueRouter from 'vue-router'
// import { sync } from 'vuex-router-sync'
// import { routes } from './route-config'

import App from './App'

// Vue.use(VueRouter)

// Setup router
// const router = new VueRouter({ routes })

// Setup vuex router sync
// sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  // router,
  render: h => h(App)
})
