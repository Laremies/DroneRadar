const axios = require('axios')
const convert = require('xml-js')
const pilotRouter = require('express').Router()


pilotRouter.get('/', async (request, response) => {
  await axios.get('https://assignments.reaktor.com/birdnest/drones')
    .then(res => {
      const json = convert.xml2js(res.data, {compact: true})
      const drones = json.report.capture.drone
      response.json(drones)
    })
})

module.exports = pilotRouter
