<template>
  <v-container v-if="isLoggedIn">
    <v-row class="text-center" >
      <v-col>
        <h1>Mijn schema's</h1>
      </v-col>
    </v-row>
    <v-simple-table>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Totale duur
          </th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr
          v-for="(item, index) in schemas"
          :key="index"

        >
          <td>{{ item.data.name }}</td>
          <td>{{ calculateTotalTime(item.data.activities) }}</td>
          <td>
            <v-row>
              <v-col cols="12">
                <v-btn class="mx-2" icon green small @click="$router.push({name: 'Workout', params:{id: item.id}})">
                  <v-icon>
                    mdi-shoe-sneaker
                  </v-icon>
                </v-btn>
                <v-btn class="mx-2" icon green small @click="$router.push({name: 'EditSchema', params:{SchemaId: item.id}})">
                  <v-icon>
                    mdi-lead-pencil
                  </v-icon>
                </v-btn>
                <v-btn class="mx-2" icon green small @click="deleteThisSchema(item.id)">
                  <v-icon>
                    mdi-trash-can-outline
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-row class="mt-1">
      <v-col class="text-end">
        <v-btn fab dark medium color="green" @click=" $router.push({name: 'EditSchema'})">
          <v-icon>
            mdi-plus
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else>
    <v-row class="text-center">
      <v-col>
        <h1>Log eerst in!</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getSchemas, deleteSchema } from '../services/schemas.js'
import { useAuth } from '../services/auth'
import { calculateTotalTimeForActivities } from '../controllers/timeController'

export default {
  name: 'Schemas',
  data: () => ({
    schemas: [
    ],
    isLoggedIn: false
  }),
  methods: {
    async retrieveSchemas () {
      this.schemas = []
      const schemasSnapshot = await getSchemas()
      schemasSnapshot.forEach((doc) => {
        this.schemas.push({
          id: doc.id,
          data: doc.data()
        })
      })
    },
    calculateTotalTime (activities) {
      return calculateTotalTimeForActivities(activities)
    },
    async deleteThisSchema (id) {
      await deleteSchema(id)
      await this.retrieveSchemas()
    }
  },
  async mounted () {
    this.isLoggedIn = await useAuth().checkIfLoggedIn()
    if (await useAuth().checkIfLoggedIn()) {
      await this.retrieveSchemas()
    }
  }
}
</script>
