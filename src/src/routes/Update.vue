<template>
  <div class="update">
    <h3>An update is available!</h3>

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
</template>

<script>
import { mapGetters } from 'vuex'
import * as types from '../store/mutation-types'

export default {
  computed: mapGetters([
    'isInstallingUpdate',
    'getSoftwareComponents',
    'isInstallingUpdate'
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
  margin: 20px 0px;
}

.update .actions {
  margin: 20px;
}

.components {
  margin: 20px;
}
</style>
