<template>
  <div>
    <v-btn v-if="!isSignedIn" @click="signIn" text>
      <span class="mr-2">Inloggen</span>
      <v-icon>mdi-open-in-new</v-icon>
    </v-btn>
    <div v-else>
      <v-avatar  size="30">
        <img :src="getProfilePic">
      </v-avatar>
      {{getUserName}}
      <v-btn icon @click="signOutUser">
        <v-icon>
          mdi-logout
        </v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { useAuth } from '../services/auth'
export default {
  name: 'LoginButton',
  data () {
    return {
      isSignedIn: false
    }
  },
  methods: {
    async signIn () {
      // If the user isn't signed in then send open the pop up
      if (!this.isSignedIn) {
        await useAuth().login('click')
      }
      // Double check if the login went well.
      await this.checkLogin()
    },
    async signOutUser () {
      // Sign out of Firebase.
      this.isSignedIn = await useAuth().logout()
    },
    async checkLogin () {
      // Set the isSignedIn variable
      this.isSignedIn = await useAuth().checkIfLoggedIn()
    }
  },
  computed: {
    getProfilePic () {
      // If logged in and if the user has a photo then return the picture, otherwise return placeholder picture.
      if (this.isSignedIn) {
        return useAuth().currentUser.photoURL || '../assets/profile_placeholder.png'
      }
      return '../assets/profile_placeholder.png'
    },
    getUserName () {
      if (this.isSignedIn) {
        return useAuth().currentUser.displayName
      }
      return ''
    }
  },
  async mounted () {
    // Check if logged in to update the button
    await this.checkLogin()
  }
}
</script>
