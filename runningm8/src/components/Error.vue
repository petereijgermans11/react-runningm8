<template>
  <v-card>
    <v-card-title>
      Er is iets fout gegaan!
    </v-card-title>
    <v-card-text>
      <slot></slot>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Error'
}
</script>
