<template>
  <div class="update">
    <div v-if="isSoftwareUpdateAvailable">
      <span class="update-status">An update is available!</span>

      <div class="components">
        <h4>Components</h4>
        <div v-for="component in getSoftwareComponents">
          <ul>
            <li>{{ component.name }} (current={{ component.versionCurrent }}, latest={{ component.versionLatest }})</li>
          </ul>
        </div>
      </div>

      <div class="actions">
        <button @click="installUpdate()" ref="btnInstallUpdate" class="btn btn-success">Install Update</button>
      </div>

      <div v-if="isInstallingUpdate">
        Installing update. This may take a few minutes!
      </div>
    </div>

    <div v-else>
      <span class="update-status">Software is up to date!</span>

      <div class="components">
        <h4>Components</h4>
        <div v-for="component in getSoftwareComponents">
          <ul>
            <li>{{ component.name }} (current={{ component.versionCurrent }}, latest={{ component.versionLatest }})</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as types from '../store/mutation-types'

export default {
  computed: mapGetters([
    'isInstallingUpdate',
    'getSoftwareComponents',
    'isSoftwareUpdateAvailable'
  ]),
  methods: {
    installUpdate (sender) {
      console.log('install update', sender)
      this.$refs.btnInstallUpdate.innerHTML = 'Installing Update...'
      this.$refs.btnInstallUpdate.disabled = true
      this.$store.commit(types.SET_IS_INSTALLING_UPDATE, true)
      this.$store.dispatch('sendToClient', { topic: `GHOUST/server/perform-update`, message: 'DOIT!' })
    }
  },
  components: {
  }
}
</script>

<style>
.update {
  text-align: center;
  padding: 48px;
  color: rgba(0, 0, 0, 0.54);
}

.update .actions {
  margin: 20px;
}

.update-status {
  font-weight: 700;
  font-size: 2em;
}

.components {
  margin: 20px;
}
</style>
