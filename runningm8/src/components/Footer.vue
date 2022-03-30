<template>
  <v-footer padless fixed app dark>
    <v-card tile width="100%" class="green flat lighten-1 text-center">
      <v-card-text>
        <v-btn icon class="mx-4" aria-label="Home" @click="$router.push({name: 'Home'})">
          <v-icon>
            mdi-home
          </v-icon>
        </v-btn>
        <v-btn icon class="mx-4" aria-label="Workout" @click="$router.push({name: 'Workout'})">
          <v-icon>
            mdi-timer
          </v-icon>
        </v-btn>
        <v-btn icon class="mx-4" aria-label="Schemas" @click="$router.push({name: 'Schemas'})">
          <v-icon>
            mdi-shoe-sneaker
          </v-icon>
        </v-btn>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>
