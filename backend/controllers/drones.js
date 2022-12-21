const axios = require('axios')
const convert = require('xml-js')
const droneRouter = require('express').Router()
const calculateDistance = require('../helpers/calculateDistance')
const createPilot = require('../helpers/createPilot')
const scheduleDelete = require('../helpers/deleteFromDb')

let violationDrones = []

// Get drones which violate the NDZ
const getViolations = async () => {
  const res = await axios.get('https://assignments.reaktor.com/birdnest/drones')
  const json = convert.xml2js(res.data, {compact: true})
  const drones = json.report.capture.drone
  const radius = 100000

  drones.forEach(async drone => {
    const posX = drone.positionX._text
    const posY = drone.positionY._text
    const distance = calculateDistance(posX, posY)

    if (distance <= radius) {
      const serialNum = drone.serialNumber._text
      console.log(serialNum)
      console.log(distance)

      const violationDrone = violationDrones.find(d => d.serialNumber === serialNum)
      if (violationDrone) {
        violationDrone.time = Date.now()
        if (distance < violationDrone.closestDistance) {
          violationDrone.closestDistance = distance
        }
      } else {
        const pilotObject = await createPilot(serialNum)

        const droneObject = {
          serialNumber: serialNum,
          closestDistance: distance,
          time: Date.now(),
          pilot: pilotObject
        }
        console.log(droneObject)
        violationDrones.push(droneObject)
      }
    }
  })
    
}


droneRouter.get('/', async (request, response) => {
  violationDrones.forEach(drone => {
    scheduleDelete(drone.serialNumber, violationDrones)
  })

  await getViolations()
  response.json(violationDrones)
})

module.exports = droneRouter
