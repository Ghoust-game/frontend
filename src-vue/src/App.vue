<template>
  <div id="app">
    <header>
      <h1>Ghoust Game</h1>
    </header>

    <router-view></router-view>
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
  }
}
</script>

<style>
#app {
  margin: 20px 40px;
}
</style>
