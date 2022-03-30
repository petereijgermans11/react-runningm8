<template>
  <v-app-bar app color="green lighten-1" dark>
    <v-spacer></v-spacer>
    <LoginButton></LoginButton>
  </v-app-bar>
</template>

<script>
import LoginButton from './LoginButton'
export default {
  name: 'TopBar',
  components: {
    LoginButton
  }
}
</script>
