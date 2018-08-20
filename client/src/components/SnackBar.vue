<template>
  <div>
    <v-snackbar
      :value="$store.state.snackBar.status"
      :timeout="3000"
      :right="true"
      :top="true"
      :color="$store.state.snackBar.color"
      :vertical="true">
      {{ $store.state.snackBar.text }}
      <v-btn
        flat
        @click="closeSnackBar">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  methods: {
    closeSnackBar () {
      this.$store.dispatch('snackBar/setSnackBar', [false, '', ''])
    }
  }
}
</script>
<style>

</style>
