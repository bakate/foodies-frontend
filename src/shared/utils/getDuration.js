export const getDuration = (duration) => {
  let secondsLeft = duration * 60 // to convert minutes within seconds
  const hours = Math.floor(secondsLeft / 3600) // to get hours the ~~ is equal to Math.floor
  secondsLeft %= 3600 // to get the remaining minutes
  const minutes = Math.floor(secondsLeft / 60)

  return { hours, minutes }
}
