// Format the given time in seconds to "minutes:seconds" format. For example; 142 will be converted to 2:22
export function formatTime (time) {
  const minutes = calculateMinutes(time)
  let seconds = calculateSeconds(time)

  if (seconds < 10) {
    seconds = `0${seconds}`
  }
  return `${minutes}:${seconds}`
}
export function calculateTotalTimeForActivities (activities) {
  let total = 0
  activities.forEach(activity => {
    total += Number(activity.duration)
  })
  return formatTime(total)
}

function calculateMinutes (time) {
  return Math.floor(time / 60)
}
function calculateSeconds (time) {
  return time % 60
}
