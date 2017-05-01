<template>
    <div>
    Home
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Choices from './Choices'
import Files from './Files'

export default {
  computed: mapGetters([
  ]),
  methods: mapActions([
  ]),
  components: {
    Choices, Files
  }
}
</script>

<style>
.col-options {
  max-width: 230px;
}
</style>
