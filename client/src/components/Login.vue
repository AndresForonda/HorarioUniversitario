<template lang="html">
  <v-layout>
    <v-flex xs8 sm6 md4 offset-md4 offset-sm3 offset-xs2>
      <div class="white elevation-2">
        <v-toolbar flat dense dark color="blue">
          <v-toolbar-title >Login</v-toolbar-title>
        </v-toolbar>
        <div class="pl-4 pr-4 pt-2 pb-2">
          <v-text-field
            autocomplete="on"
            v-model="email"
            type="email"
            label="Email"
          ></v-text-field>
          <br>
          <v-text-field
            v-model="password"
            type="password"
            label="Contraseña"
          ></v-text-field>
          <br>
          <div class="error" v-html="error" />
          <br>
          <v-btn dark class="blue"
            @click="login">
            Login
          </v-btn>
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
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('login/setToken', response.data.user)
        this.$store.dispatch('login/setUser', response.data.token)
        this.$router.push({
          name: 'root'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
