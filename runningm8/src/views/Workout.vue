<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          Workout
        </h1>
      </v-col>
    </v-row>
    <Error v-if="error"></Error>
    <v-card v-else>
      <v-row>
        <v-col cols="12">
          <div class="d-flex justify-center">
            <h2>{{title}}</h2>
          </div>
          <div class="d-flex justify-center">
          <Timer ref="timer" :activity="currentActivity" @activityDone="setNextActivity()" @finishSchema="finishSchema"></Timer>
          </div>
        </v-col>
        <v-col cols="12">
          <v-card-text class="text-center">
            <h4>Huidige activiteit</h4>
            <p>{{currentActivity.activity}}</p>
            <div v-if="nextActivity">
              <h4>Volgende activiteit</h4>
              <p>{{nextActivity.activity}}</p>
            </div>
          </v-card-text>
        </v-col>
      </v-row>

    </v-card>
  </v-container>
</template>

<script>
import Timer from '../components/Timer'
import Error from '../components/Error'
import { getSchemaById } from '../services/schemas'

export default {
  name: 'Workout',
  components: {
    Error,
    Timer
  },
  props: {
    id: String
  },
  data () {
    return {
      title: '',
      error: false,
      currentActivity: {
      },
      nextActivity: {
      },
      activityIndex: 0,
      // Basic schema in case there is no schema selected
      allActivities: [
        {
          activity: 'Hardlopen',
          duration: 900
        },
        {
          activity: 'Rust',
          duration: 60
        },
        {
          activity: 'Sprint',
          duration: 300
        },
        {
          activity: 'Rust',
          duration: 300
        }
      ]
    }
  },
  methods: {
    async initActivities () {
      // Clear inputs
      this.activityIndex = 0
      this.currentActivity = {}
      this.nextActivity = {}
      if (this.id) {
        this.allActivities = []
        const querySnapshot = await getSchemaById(this.id)
        if (querySnapshot) {
          this.title = querySnapshot.name
          this.allActivities = querySnapshot.activities
        } else {
          this.error = true
        }
      }
      // If there are more activities in schema then init next activity
      if (this.allActivities.length > 1) {
        this.currentActivity = this.allActivities[this.activityIndex]
        this.activityIndex++
        this.nextActivity = this.allActivities[this.activityIndex]
        this.activityIndex++
      }
      // If schema only consists of one activity then don't set next activity. In order to hide it on the view
      if (this.allActivities.length === 1) {
        this.currentActivity = this.allActivities[this.activityIndex]
        this.nextActivity = null
        this.activityIndex++
      }
    },
    setNextActivity () {
      this.currentActivity = this.nextActivity
      // if a next activity exists
      if (this.allActivities[this.activityIndex]) {
        this.nextActivity = this.allActivities[this.activityIndex]
        this.activityIndex++
      } else {
        this.nextActivity = null
      }
      // If there are no more activities call finishSchema
      if (!this.currentActivity) {
        this.finishSchema()
      }
    },
    finishSchema () {
      // Call stopTimer in timer component
      this.$refs.timer.stopTimer()
      // Reset to default
      this.initActivities()
    }
  },
  mounted () {
    this.initActivities()
  }
}
</script>
