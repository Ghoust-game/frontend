<template>
  <div class="route-menu">
    <div class="row">
      <router-link class="col route" tag="div" to="/">
        <img src="/static/assets/client_list.svg" class="route-button"></img>
      </router-link>

      <transition name="show-update">
        <router-link v-show="isSoftwareUpdateAvailable" class="col route update-button" tag="div" to="/update">
          <img src="/static/assets/update_ghoust.svg" class="route-button"></img>
        </router-link>
      </transition>

      <router-link class="col route" tag="div" to="/stats">
        <img src="/static/assets/stats.svg" class="route-button"></img>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: mapGetters([
    'isSoftwareUpdateAvailable'
  ]),
  methods: {
  },
  components: {
  }
}
</script>

<style>
.route-menu {
  float: none;
  width: 100%;
  display: table-cell;
  vertical-align: bottom;
}

.route-menu .row {
  height: 48px;
}

.route-menu div {
  text-align: center;
}

.route {
  height: 100%;
  transition: all .3s ease;
}

.route .update-button{
  width: 0%;
}

.route:hover {
  background-color: #1D8248;
}

.route.router-link-exact-active {
  background-color: #1B7842;
}

.route-button {
  height: 48px;
  padding: 8px;
}
/* Transition */
.show-update-enter-active {
  transition: all .3s ease;
}
.show-update-leave-active {
  transition: all .5s ease;
}
.show-update-enter, .show-update-leave-to {
  width: 100%;
}

</style>
