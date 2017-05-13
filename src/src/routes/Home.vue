<template>
  <div class="main-view">
    <div class="subheader">
      <GameInstanceList></GameInstanceList>
      <GameModeList></GameModeList>
    </div>

    <Overview></Overview>
    <!-- The best way i could find to do this animation since vue hides element after transitions automtically -->
    <transition-group name="slide-info-bar" :run="ghoustDevToolsVisible">
      <InfoBar v-if="ghoustDevToolsVisible" key="infoBar" class="infobar-animated"></InfoBar>
      <GhoustDevTools v-if="ghoustDevToolsVisible" key="ghoustDevTools"></GhoustDevTools>
    </transition-group>

    <InfoBar class="infobar-static" v-show="!ghoustDevToolsVisible"></InfoBar>

    </div>
  </template>

<script>
import { mapGetters } from 'vuex'

import Overview from '../components/Overview'
import GameModeList from '../components/GameModeList'
import GameInstanceList from '../components/GameInstanceList'
import GhoustDevTools from '../components/GhoustDevTools'
import InfoBar from '../components/InfoBar'

export default {
  computed: mapGetters([
    'ghoustDevToolsVisible'
  ]),
  components: {
    Overview, GameModeList, GameInstanceList, GhoustDevTools, InfoBar
  }
}
</script>


<style>
body {
  overflow: hidden;
}

.main-view {
  height: 90%;
}

.subheader {
  height: 20%;
}

.infobar-static {
  bottom: 0;
  z-index: 0;
}
.infobar-animated {
  bottom: 25vh;
  z-index: 3;
}

.slide-info-bar-enter-active {
  transition: all .3s ease;
}
.slide-info-bar-leave-active {
  transition: all .5s ease;
}
.slide-info-bar-enter, .slide-info-bar-leave-to {
  transform: translateY(25vh);
}
</style>
