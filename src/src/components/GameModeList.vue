<template>
    <div class="game-mode-list">
      <h4>Game Modes Available</h4>

      <button v-for="gameMode in getGameModes" class="btn btn-primary" @click="startGameMode(gameMode)" >{{ gameMode }}</button>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import * as types from '../store/mutation-types'

export default {
  computed: mapGetters([
    'getGameModes'
  ]),
  methods: {
    startGameMode (gameMode) {
      console.log('starting game mode', gameMode)
      this.$store.dispatch('mqttStartGame', gameMode)
    }
  },
  components: {
  }
}
</script>

<style>
.game-mode-list {
  margin: 40px 0px
}

.btn {
  margin: 4px;
}
</style>
