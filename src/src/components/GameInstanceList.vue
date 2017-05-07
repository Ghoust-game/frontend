<template>
    <div class="game-instance-list">
      <h4>Running Games</h4>
      <ul>
        <li v-for="gameInstance in getGameInstances">{{ gameInstance.id }}: {{ gameInstance.name }}</li>
        </ul>
      <!--
      <div style="margin:20px;">
        <div v-for="gameMode in getGameModes">{{ gameMode }}</div>
      </div>
      -->
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import * as types from '../store/mutation-types'

export default {
  computed: mapGetters([
    'getGameInstances'
  ]),
  methods: {
    startGameMode (gameMode) {
      console.log('starting game mode', gameMode)
    }
  },
  components: {
  }
}
</script>
<style>
.game-instance-list {
  margin: 40px 0px
}

.btn {
  margin: 4px;
}
</style>
