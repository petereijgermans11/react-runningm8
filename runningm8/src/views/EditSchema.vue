<template>
  <v-container v-if="isLoggedIn && !errored">
    <h1>Schema edit</h1>
    <v-card>
      <v-card-title>
        Schema - {{ schema.title }}
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="6">
              <v-text-field v-model="schema.title" :rules="validationRules.nameRule" label="Titel" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-data-table :headers="tableSettings.headers" :items="schema.activities" hide-default-footer sort-by="index" class="elevation-1">
                <template v-slot:top>
                  <v-toolbar flat>
                    <v-toolbar-title>Activiteiten</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-btn color="green" dark class="mb-2" @click="clearDialog">
                      Nieuwe Activiteit
                    </v-btn>
                  </v-toolbar>
                </template>
                <template v-slot:item.duration="{ item }">
                  {{formatTime(item.duration)}}
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-icon small class="mr-2" @click="editItem(item)">
                    mdi-pencil
                  </v-icon>
                  <v-icon small @click="deleteItem(item)">
                    mdi-delete
                  </v-icon>
                </template>
                <template v-slot:no-data>
                  Nog geen activiteiten!
                </template>
              </v-data-table>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="text-end">
              <v-btn dark color="green" @click="saveSchema" :disabled="!valid">
                <v-icon class="mr-1">
                  mdi-save
                </v-icon>
                 Opslaan
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
    <v-dialog v-model="dialogEdit" max-width="500px">
      <v-form ref="dialogForm" v-model="dialogValid" lazy-validation>
        <v-card>
          <v-card-title>
            <span class="text-h5">Activiteit</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-select :items="allActivities" item-text="name" item-value="name" v-model="editedItem.activity" label="Activiteit"></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field v-model="editedItem.duration" type="number" :rules="validationRules.activityDurationRule" label="Duur in minuten" required></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="close">
              Annuleren
            </v-btn>
            <v-btn color="green darken-1" text @click="save" :disabled="!dialogValid">
              Opslaan
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Weet je zeker dat je deze activiteit wilt verwijderen?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="closeDelete">Cancel</v-btn>
          <v-btn color="green darken-1" text @click="deleteItemConfirm">Verwijder</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
  <v-container v-else-if="errored">
    <Error></Error>
  </v-container>
</template>

<script>
import { createSchema, getSchemaById, updateSchema } from '../services/schemas'
import { useAuth } from '../services/auth'
import { formatTime } from '../controllers/timeController'
import Error from '../components/Error'

export default {
  name: 'EditSchema',
  components: { Error },
  props: {
    SchemaId: String
  },
  data () {
    return {
      isLoggedIn: false,
      errored: false,
      validationRules: {
        nameRule: [
          v => !!v || 'Naam is verplicht!'
        ],
        activityDurationRule: [
          v => (!!v && v > 0) || 'Ongeldige duur!'
        ]
      },
      schema: {
        title: '',
        activities: [
        ]
      },
      allActivities: [
        { name: 'Sprint', value: 'sprint' },
        { name: 'Hardlopen', value: 'run' },
        { name: 'Wandelen', value: 'walk' },
        { name: 'Rust', value: 'rest' }
      ],
      editedIndex: -1,
      editedItem: {
        index: 0,
        activity: '',
        duration: 0
      },
      defaultItem: {
        index: 0,
        activity: '',
        duration: 0
      },
      dialogEdit: false,
      dialogDelete: false,
      tableSettings: {
        headers: [
          {
            text: 'Volgorde',
            align: 'start',
            sortable: false,
            value: 'index'
          },
          { text: 'Activiteit', value: 'activity' },
          { text: 'Duur in minuten', value: 'duration' },
          { text: 'Acties', value: 'actions', sortable: false }
        ]
      },
      valid: true,
      dialogValid: true
    }
  },
  async mounted () {
    useAuth()
    this.isLoggedIn = await useAuth().checkIfLoggedIn()
    if (this.isLoggedIn) {
      if (this.SchemaId) {
        const querySnapshot = await getSchemaById(this.SchemaId)
        console.log('data!:', querySnapshot)
        if (querySnapshot) {
          this.schema.title = querySnapshot.name
          this.schema.activities = querySnapshot.activities
        } else {
          this.errored = true
        }
      }
    } else {
      this.errored = true
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.close()
    }
  },
  methods: {
    formatTime (time) {
      return formatTime(time)
    },
    validate () {
      this.valid = this.$refs.form.validate()
    },
    clearDialog () {
      this.editedItem = {
        index: 0,
        activity: '',
        duration: 0
      }
      this.dialogEdit = true
    },
    editItem (item) {
      this.editedIndex = this.schema.activities.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.editedItem.duration = this.editedItem.duration / 60
      this.dialogEdit = true
    },
    deleteItem (item) {
      this.editedIndex = this.schema.activities.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm () {
      this.schema.activities.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close () {
      this.dialogEdit = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    save () {
      this.editedItem.duration = this.editedItem.duration * 60
      if (this.editedIndex > -1) {
        Object.assign(this.schema.activities[this.editedIndex], this.editedItem)
      } else {
        this.editedItem.index = this.schema.activities.length + 1
        this.schema.activities.push(this.editedItem)
      }
      this.close()
    },
    async saveSchema () {
      this.validate()
      if (this.valid) {
        if (this.SchemaId) {
          await updateSchema(this.SchemaId, this.schema.title, this.schema.activities)
            .then(() => {
              this.$router.push({ name: 'Schemas' })
            })
        } else {
          try {
            await createSchema(this.schema.title, this.schema.activities)
              .then(() => {
                this.$router.push({ name: 'Schemas' })
              })
          } catch (e) {
            console.error(e)
          }
        }
      }
    }
  }
}
</script>
