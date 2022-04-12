const calculatExercise = (list: number[], target: number): object => {
  let trainingDays = 0
  let success = true
  let rating = 0
  let sum = 0

  list.forEach(hour => {
    sum += hour
    if (hour !== 0) {
      trainingDays++
    }
    if (hour >= target) {
      rating++
    } else if (hour < target) {
      rating--
      success = false
    }
  })

  const average = sum / list.length

  return {
    periodLength: list.length,
    trainingDays,
    success,
    rating,
    ratingDescription: 'not too bad but could be better',
    target,
    average,
  }
}

export default calculatExercise
