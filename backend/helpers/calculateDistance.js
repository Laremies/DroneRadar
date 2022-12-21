// Helper function to calculate the drone's distance to the middle of the NDZ.
const calculateDistance = (posX, posY) => {
  const center = 250000
  // Pythagoras theorem
  return (Math.sqrt(Math.pow(posX - center, 2) + Math.pow(posY - center, 2)))
}

module.exports = calculateDistance
