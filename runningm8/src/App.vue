<template>
  <v-app>
    <TopBar></TopBar>
    <v-main>
      <v-row v-if="!promptDismissed">
        <Popup @dismissEvent="dismiss" @installEvent="install"></Popup>
      </v-row>
      <router-view/>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Popup from './components/Popup'
import TopBar from './components/TopBar'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Popup,
    TopBar,
    Footer
  },
  data: () => ({
    // These are for PWA!
    promptDismissed: false,
    installer: undefined,
    deferredPrompt: null
  }),
  created () {
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault()
      // Stash the event so it can be triggered later.
      this.deferredPrompt = e
    })
    window.addEventListener('appinstalled', () => {
      this.promptDismissed = true
    })

    if (window.matchMedia('(display-mode: standalone)').matches) {
      this.promptDismissed = true
    }
  },
  methods: {
    dismiss () {
      this.promptDismissed = true
    },
    install () {
      this.deferredPrompt.prompt()
    }
  },
  mounted () {
    if (window.matchMedia('(display-mode: standalone)').matches) {
      this.promptDismissed = true
    }
  }
}
</script>
