<template>
    <v-toolbar fixed class="blue" dark>
      <v-toolbar-title dark class="mr-4">Horarios universitarios</v-toolbar-title>
      <v-toolbar-items>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn
          v-if="$store.state.login.isUserLoggedIn"
          flat
          dark
          to="subjects">
          Materias
        </v-btn>
        <v-btn
          v-if="!$store.state.login.isUserLoggedIn"
          to="/login"
          flat
          dark>
            Login
        </v-btn>
        <v-btn
          v-if="!$store.state.login.isUserLoggedIn"
          to="/register"
          flat
          dark>
            Registrarse
        </v-btn>
        <v-btn
          v-if="$store.state.login.isUserLoggedIn"
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
    logout () {
      this.$store.dispatch('login/setToken', null)
      this.$store.dispatch('login/setUser', null)
      this.$router.push({
        name: 'root'
      })
    }
  }
}
</script>
<style>
</style>
