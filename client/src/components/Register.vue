<template lang="html">
  <div class="">
    <h1>Registro</h1>
    <input
      type="email"
      name="email"
      v-model="email"
      placeholder="email"/>
    <br>
    <input
    type="password"
    name="password"
    v-model="password"
    placeholder="Contraseña"/>
    <br>
    <button
      @click="register">
      Registrar
    </button>
  </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  watch: {
    email (value) {
      console.log('Email has changed', value)
    }
  },
  methods: {
    async register () {
      await AuthenticationService.register({
        email: this.email,
        password: this.password
      })
    }
  },
  mounted () {
    setTimeout(() => {
      this.email = 'hello world'
    }, 2000)
  }
}
</script>

<style lang="css" scoped>
</style>
