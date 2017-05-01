<template>
  <div id="app">
    <header>
      <h1>Ghoust Game</h1>
    </header>

    <div id="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// import { navbar } from 'vue-strap'

import { mapGetters, mapActions } from 'vuex'

export default {
  computed: mapGetters([
    'currentRoutePath',
    'isLoading'
  ]),
  methods: mapActions([
  ]),
  components: {
  },
  created: function () {
    // `this` points to the vm instance. You can access the state store with `this.$store`
    this.$store.dispatch('startMQTT')
  }
}
</script>

<style>
#app {
  margin: 20px 40px;
}

#content {
}
</style>
