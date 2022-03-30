<template>
  <v-container>
    <v-row>
      <v-col class="mb-4">
        <h1 class="text-center display-2 font-weight-bold mb-3">
          Welkom bij RunningFeet
        </h1>

        <v-card>
          <v-card-title>
            Introductie
          </v-card-title>
          <v-card-text>
            <h3>Aan de slag</h3>
            <p>Om met RunningFeet aan de slag te gaan moet je inloggen met een Google Account, dit kan via de knop 'Inloggen' rechtsboven.</p>
            <h3>Schema's aanmaken</h3>
            <p>
              Een schema is een trainings schema die door jou is aangemaakt. Je kan schema's aanmaken wanneer je bent ingelogd.
              Navigeer naar schema's door op het schoen icoontje te klikken onderaan de pagina.
            </p>
            <h3>Training met je schema</h3>
            <p>
              Om volgens je eigen gespecifieerde schema te rennen ga je naar schema's en klik je vanuit hier op het schoen
              icoontje naast het schema die je wilt rennen. Je schema wordt ingeladen in de workout en klik op start om te
              beginnen met rennen!
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Introduction'
}
</script>
