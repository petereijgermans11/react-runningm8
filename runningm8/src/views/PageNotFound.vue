<template>
<v-container>
  <Error>
    Pagina kon niet worden gevonden
  </Error>
</v-container>
</template>

<script>
import Error from '../components/Error'
export default {
  name: 'PageNotFound',
  components: {
    Error
  }
}
</script>
