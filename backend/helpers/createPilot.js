const axios = require('axios')

// Helper function to create a pilot object for a drone.
const createPilot = async (serialNumber) => {
  const res = await axios.get(`https://assignments.reaktor.com/birdnest/pilots/${serialNumber}`)
  const pilot = res.data

  const pilotObject = {
    id: pilot.pilotId,
    name: `${pilot.firstName} ${pilot.lastName}`,
    phoneNum: pilot.phoneNumber,
    email: pilot.email
  }
  
  return pilotObject
}

module.exports = createPilot
