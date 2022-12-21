const express = require('express')
const app = express()
const cors = require('cors')
const droneRouter = require('./controllers/drones')
const middleware = require('./utils/middleware')

app.use(express.json())
app.use(cors())
app.use('/api/drones', droneRouter)
app.use(express.static('build'))

app.use(middleware.unknownEndpoint)

module.exports = app
