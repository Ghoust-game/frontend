<template>
  <div class="route-menu">
    <div class="row">
      <router-link class="col route" tag="div" to="/">
        <span class="update-button">Client List!</span>
      </router-link>

      <transition>
        <router-link class="col route" tag="div" to="/update">
          <span class="update-button">Update!</span>
        </router-link>
      </transition>

      <router-link class="col route" tag="div" to="/">
        <span class="update-button">Stats!</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import * as types from '../store/mutation-types'

export default {
  computed: mapGetters([
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

.route:hover {
  background-color: #2f2f2f;
}

.route.router-link-exact-active {
  background-color: #414141;
}
</style>
