const removeDuplicates = (drones) => {
  return drones.reduce((acc, curr) => {
    if (!acc.find(drone => drone.serialNumber === curr.serialNumber)) {
      acc.push(curr)
    }
    return acc
  }, [])
}

module.exports = removeDuplicates
