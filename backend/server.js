/* eslint-env node */
const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

const brandsRouter = require('./routes/brands')
app.use('/api/brands', brandsRouter)
const colorsRouter = require('./routes/colors')
app.use('/api/colors', colorsRouter)
const licenseTypesRouter = require('./routes/licenseTypes')
app.use('/api/licenseTypes', licenseTypesRouter)
const modelsRouter = require('./routes/models')
app.use('/api/models', modelsRouter)
const suppliersRouter = require('./routes/suppliers')
app.use('/api/suppliers', suppliersRouter)
const facilitiesRouter = require('./routes/facilities')
app.use('/api/facilities', facilitiesRouter)
const driversRouter = require('./routes/drivers')
app.use('/api/drivers', driversRouter)
const vehiclesRouter = require('./routes/vehicles')
app.use('/api/vehicles', vehiclesRouter)
const cardsRouter = require('./routes/cards')
app.use('/api/cards', cardsRouter)
const driverCardsRouter = require('./routes/driverCards')
app.use('/api/driverCards', driverCardsRouter)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
