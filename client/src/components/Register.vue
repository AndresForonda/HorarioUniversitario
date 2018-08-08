<template lang="html">
  <v-layout>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">
        <v-toolbar flat dense color="blue">
          <v-toolbar-title>Registro</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pb-2">
          <form
            name="register-form"
            autocomplete="off">
            <v-text-field
              v-model="email"
              type="email"
              label="Email"
            ></v-text-field>
            <br>
            <v-text-field
              v-model="password"
              type="password"
              label="Contraseña"
              autocomplete="new-password"
            ></v-text-field>
            <br>
            <div class="error" v-html="error" />
            <br>
            <v-btn class="blue"
              @click="register">
              Registrar
            </v-btn>
          </form>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: '',
      status: false,
      error: null
    }
  },
  methods: {
    async register () {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password,
          status: this.status
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
