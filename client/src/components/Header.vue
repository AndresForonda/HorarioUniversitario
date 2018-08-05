<template>
    <v-toolbar fixed class="blue">
      <v-toolbar-title class="mr-4">Horarios universitarios</v-toolbar-title>
      <!-- Todo: Implement me -->
      <!-- <v-toolbar-items>
        <v-btn flat dark>
          Browse
        </v-btn>
      </v-toolbar-items> -->
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn to="/" flat dark>
            Inicio
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items>
        <v-btn to="/login" flat dark>
            Login
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items>
        <v-btn to="/register" flat dark>
            Registrarse
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
</template>
<script>
export default {
  methods: {
    navigateTo (route) {
      this.$route.push(route)
    }
  }
}
</script>
<style>
</style>
