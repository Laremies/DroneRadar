// Schedules the deletion based on 'timeTillOld'.
const deleteOldDrones = (violationDrones) => {
  const currentTime = Date.now()
  const timeTillOld = 600000 // 10 minutes in milliseconds

  // Filter the violationDrones array to only include drones with a time less than 10 minutes old
  const updatedDrones = violationDrones.filter(drone => {
    const elapsedTime = currentTime - drone.time
    return elapsedTime < timeTillOld
  })

  // Update the violationDrones array with the filtered array
  return updatedDrones
}

module.exports = deleteOldDrones
