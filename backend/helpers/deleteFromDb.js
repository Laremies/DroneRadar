// Delete the drone with this serialNumber from the array.
const deleteFromViolations = (serialNumber, drones) => {
  const index = drones.findIndex(drone => drone.serialNumber === serialNumber)
  if (index !== -1) {
    drones.splice(index, 1)
  }
}

/*
  Delay determines how long we keep the drones in the array
  after we last detected it in the NDZ.
 */
const delay = 1000 * 60 * 10 // 10 minutes in milliseconds

// Schedules the deletion based on 'delay'.
const scheduleDelete = (serialNumber, drones) => {
  setTimeout(() => {
    deleteFromViolations(serialNumber, drones)
  }, delay)
}

module.exports = scheduleDelete
