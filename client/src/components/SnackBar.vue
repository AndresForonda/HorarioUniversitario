<template>
  <v-snackbar
    v-model="snackbar"
    :timeout="3000"
    :right="right"
    :top="top"
    :color="color"
    :vertical="vertical">
    {{ text }}
    <v-btn
      color="color"
      flat
      @click="closeSnackBar">
      Close
    </v-btn>
  </v-snackbar>
</template>
<script>
export default {
  data () {
    return {
      snackBar: this.$store.snackBar.status,
      timeout: this.$store.snackBar.timeout,
      right: this.$store.snackBar.right,
      top: this.$store.snackBar.top,
      color: this.$store.snackBar.color,
      vertical: this.$store.snackBar.vertical
    }
  },
  methods: {
    closeSnackBar () {
      this.$store.dispatch('setSnackBar', false, null, null)
    }
  }
}
</script>
<style>

</style>
