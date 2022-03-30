<template>
  <v-col cols="12">
    <v-card tile color="green lighten-2" dark>
      <v-card-title left width="100%">
        <v-row>
          <v-col>
            Voeg deze app toe!
          </v-col>
          <v-col class="text-end">
            <v-icon aria-label="Sluiten" large @click="$emit('dismissEvent')">
              mdi-close
            </v-icon>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text @click="$emit('installEvent')">Klik hierrrr...</v-card-text>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: 'Popup'
  // It emits to App Level, no methods here because the functionallity is over the entire app.
}
</script>
