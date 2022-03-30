<template>
  <div>
    <div class="base-timer d-flex justify-center">
      <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g class="base-timer__circle">
          <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45" />
          <path
            id="base-timer-path-remaining"
            :stroke-dasharray="circleDasharray"
            class="base-timer__path-remaining"
            :class="remainingPathColor"
            d="
                    M 50, 50
                    m -45, 0
                    a 45,45 0 1,0 90,0
                    a 45,45 0 1,0 -90,0
                  "
          ></path>
        </g>
      </svg>
      <span id="base-timer-label" class="base-timer__label">
        {{formattedTime}}
      </span>
    </div>
    <v-row>
      <v-col cols="12" class="d-flex justify-center mt-2">
        <v-btn v-if="!timerRunning" @click="startTimer" dark rounded color="green lighten-1">
          <v-icon>
            mdi-play
          </v-icon>
          Start
        </v-btn>
        <v-btn v-else @click="pauseTimer" dark rounded color="green lighten-1">
          <v-icon>
            mdi-pause
          </v-icon>
          Pauzeer
        </v-btn>
        <v-btn @click="stopTimer(true)" rounded dark color="green lighten-1">
          Stop
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { textToSpeech, threeBeeps } from '../controllers/audioController'
import { formatTime } from '../controllers/timeController'

export default {
  name: 'Timer',
  data: () => ({
    timePassed: 0,
    timerInterval: null,
    timerRunning: false
  }),
  props: {
    activity: Object,
    timerStarted: Boolean
  },
  computed: {
    // Format the time when this.timeLeft changes
    formattedTime () {
      return formatTime(this.timeLeft)
    },
    // Returns part of the green circle.
    circleDasharray () {
      return `${(this.timeFraction * 283).toFixed(0)} 283`
    },
    // Calculate the time left on the timer
    timeLeft () {
      return this.activity.duration - this.timePassed
    },
    // Calculate the values of when the timer needs to turn red or orange
    timeFraction () {
      const rawTimeFraction = this.timeLeft / this.activity.duration
      return rawTimeFraction - (1 / this.activity.duration) * (1 - rawTimeFraction)
    },
    // Color the timer and beep if it turns redd
    remainingPathColor () {
      if (this.timeLeft <= this.activity.duration / 6) {
        this.beep('long')
        return 'red'
      } else if (this.timeLeft <= this.activity.duration / 3) {
        return 'orange'
      } else {
        return 'green'
      }
    }
  },
  methods: {
    // Start the timer and speak the activity name.
    startTimer () {
      this.timerRunning = true
      textToSpeech(this.activity.activity)
      this.timerInterval = setInterval(() => (this.timePassed += 1), 1000)
    },
    // Let the view handle the event when there are no more activities
    onTimesUp () {
      this.timePassed = 0
      this.$emit('activityDone')
    },
    // Clear the interval of a second and set timerRunning to zero
    pauseTimer () {
      clearInterval(this.timerInterval)
      this.timerRunning = false
    },
    // Clear the interval and if it was stopped by user emit the event up to the view. Reset all values back to default.
    stopTimer (reset) {
      clearInterval(this.timerInterval)
      this.timerRunning = false
      this.timePassed = 0
      if (reset) {
        this.$emit('finishSchema')
      }
    },
    // threeBeeps is a Sound provided by the controller. Different sounds can be added here for more audio. Hence the mode.
    beep (mode) {
      if (mode === 'long') {
        threeBeeps.play()
      }
    }
  },
  watch: {
    // Subscribe to the time and when it reaches 0 call the onTimesUp function
    timeLeft (newValue) {
      if (newValue === 0) {
        this.onTimesUp()
      }
    },
    // Subscribe to activity and if there are no more new activities call the stopTimer method. Otherwise speak out the activity name.
    activity (newValue) {
      if (!newValue) {
        this.stopTimer()
      } else {
        textToSpeech(newValue.activity)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  /* Sets the containers height and width */
  .base-timer {
    position: relative;
    height: 300px;
    width: 300px;

    &__path-remaining {
      stroke-width: 7px;
      stroke-linecap: round;
      transform: rotate(90deg);
      transform-origin: center;
      transition: 1s linear all;
      fill-rule: nonzero;
      stroke: currentColor;

      &.green {
        color: rgb(65, 184, 131);
      }

      &.orange {
        color: orange;
      }

      &.red {
        color: #FF5A5A;
      }
    }
    &__svg {
      /* Flips the svg and makes the animation to move left-to-right */
      transform: scaleX(-1);
      }
    }

    /* Removes SVG styling that would hide the time label */
  .base-timer__circle {
    fill: none;
    stroke: none;
  }

  /* The SVG path that displays the timer's progress */
  .base-timer__path-elapsed {
    stroke-width: 7px;
    stroke: grey;
  }
  .base-timer__label {
    position: absolute;

    /* Size should match the parent container */
    width: 300px;
    height: 300px;

    /* Keep the label aligned to the top */
    top: 0;

    /* Create a flexible box that centers content vertically and horizontally */
    display: flex;
    align-items: center;
    justify-content: center;

    /* Sort of an arbitrary number; adjust to your liking */
    font-size: 48px;
  }
</style>
