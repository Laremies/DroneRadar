const express = require('express')
const app = express()
const cors = require('cors')
const pilotRouter = require('./controllers/pilots')
const middleware = require('./utils/middleware')

app.use(express.json())
app.use(cors())
app.use('/api/pilots', pilotRouter)

app.use(middleware.unknownEndpoint)

module.exports = app
