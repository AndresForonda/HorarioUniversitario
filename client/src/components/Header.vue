<template>
    <v-toolbar fixed class="blue">
      <v-toolbar-title class="mr-4">Horarios universitarios</v-toolbar-title>
      <v-toolbar-items>
        <v-btn
          flat
          dark
          to="songs">
          Browse
        </v-btn>
        <v-btn
          v-if="$store.state.isUserLoggedIn"
          flat
          dark
          to="subjects">
          Materias
        </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn
          v-if="!$store.state.isUserLoggedIn"
          to="/login"
          flat
          dark>
            Login
        </v-btn>
        <v-btn
          v-if="!$store.state.isUserLoggedIn"
          to="/register"
          flat
          dark>
            Registrarse
        </v-btn>
        <v-btn
          v-if="$store.state.isUserLoggedIn"
          @click="logout"
          flat
          dark>
            Cerrar sesión
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
</template>
<script>
export default {
  methods: {
    navigateTo (route) {
      this.$route.push(route)
    },
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'root'
      })
    }
  }
}
</script>
<style>
</style>
