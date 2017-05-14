<template>
  <div class="main-view ">
    <div class="subheader row">
      <!-- <GameInstanceList class="col"></GameInstanceList> disabled until implemented -->
      <GameModeList class="col"></GameModeList>
    </div>

    <Overview></Overview>
    <!-- The best way i could find to do this animation since vue hides element after transitions automtically -->
    <transition name="slide-dev-tools" :run="ghoustDevToolsVisible">
      <GhoustDevTools v-if="ghoustDevToolsVisible"></GhoustDevTools>
    </transition>

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
  position: absolute;
  top: 10%;
  height: 90%;
  width: 100%;
}

.subheader {
  height: 20%;
  width:100%;
  background-color: #212121;
  box-shadow: 0 10px 17px -10px rgba(0,0,0,0.87);
  z-index: 4;
  display: table;
  table-layout: fixed;
  margin: 0 !important;
  color: rgba(255, 255, 255, 0.9);
  padding: 16px 16px 16px 16px;
}

.subheader .col {
  padding: 0 0 0 0;
}
.slide-dev-tools-enter-active {
  transition: all .3s ease;
}
.slide-dev-tools-leave-active {
  transition: all .5s ease;
}
.slide-dev-tools-enter, .slide-dev-tools-leave-to {
  transform: translateY(25vh);
}
</style>
