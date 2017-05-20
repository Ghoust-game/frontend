<template>
    <div class="game-mode-list-container">
      <div>
      <div class="game-mode-list-label">
        <span>Game Mode</span>
        </br>
      </div>
      </div>
      <div class="row">
        <div class="col game-mode-button" v-for="gameMode in getGameModes" @click="startGameMode(gameMode)">
          {{ gameMode }}
        </div>
      </div>
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
.game-mode-list-container {
  width: 100%;
  text-align: center;
  display: table-row;
}

.game-mode-list-label {
  width: 100%;
  height: 24px;
  font-size: 16px;
  font-weight: 700;
  color: #ffffffB3;
}

.game-mode-button {
  transition: background-color 0.2s ease;
  text-align: center;
  font-size: 24px;
  height: 36px;
  border-radius: 4px;
  margin: 8px 16px 0 16px;
  color: #ffffffB3;
}

.game-mode-button:hover {
  background-color: #414141;
}

</style>
