const axios = require('axios')
const convert = require('xml-js')
const droneRouter = require('express').Router()
const calculateDistance = require('../helpers/calculateDistance')
const createPilot = require('../helpers/createPilot')
const deleteOldDrones = require('../helpers/deleteOldDrones')
const removeDuplicates = require('../helpers/removeDuplicates')

let violationDrones = []

// Get drones which violate the NDZ
const getViolations = async () => {
  try {
    const res = await axios.get('https://assignments.reaktor.com/birdnest/drones')
    const json = convert.xml2js(res.data, {compact: true})
    const drones = json.report.capture.drone
    const radius = 100000

    for (const drone of drones) {
      const posX = drone.positionX._text
      const posY = drone.positionY._text
      const distance = calculateDistance(posX, posY)

      if (distance <= radius) {
        const serialNum = drone.serialNumber._text
        const violationDrone = violationDrones.find(d => d.serialNumber === serialNum)

        // If drone already exists, update its time and closest distance, else create a new drone.
        if (violationDrone) {
          violationDrone.time = Date.now()

          if (distance < violationDrone.closestDistance) {
            violationDrone.closestDistance = distance
          }
        } else {
          const pilotObject = await createPilot(serialNum)

          if (pilotObject) {
            const droneObject = {
              serialNumber: serialNum,
              closestDistance: distance,
              time: Date.now(),
              pilot: pilotObject
            }
            violationDrones.push(droneObject)
          }
          
          // for redundancy and race condition avoidance when using an array for storing data
          violationDrones = removeDuplicates(violationDrones)
        }
      }
    }
    violationDrones = deleteOldDrones(violationDrones)

  } catch (error) {
    console.log(error)
  }
}


setInterval(getViolations, 2000)

droneRouter.get('/', (request, response) => {
  response.json(violationDrones)
})

module.exports = droneRouter
