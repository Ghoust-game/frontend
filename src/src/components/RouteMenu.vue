<template>
  <div class="route-menu">
    <div class="row">
      <router-link class="col route" tag="div" to="/">
        <img src="/static/assets/client_list.svg" class="route-button"></img>
      </router-link>

      <transition>
        <router-link class="col route" tag="div" to="/update">
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
export default {
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

.route-button {
  height: 48px;
  padding: 8px;
}
</style>
