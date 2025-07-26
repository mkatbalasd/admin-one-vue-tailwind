const crypto = require('crypto')
const pool = require('../db')

async function generateCustomUUID() {
  let token = ''
  let rows = []
  do {
    token = crypto.randomUUID().replace(/-/g, '').slice(0, 31)
    ;[rows] = await pool.query('SELECT 1 FROM OPC_Card WHERE token = ? LIMIT 1', [token])
    if (rows.length === 0) {
      ;[rows] = await pool.query('SELECT 1 FROM OPC_DriverCard WHERE token = ? LIMIT 1', [token])
    }
  } while (rows.length > 0)
  return token
}

async function generateCardNumber(facilityId) {
  let prefix = '33.00'
  if (facilityId) {
    const [facility] = await pool.query(
      'SELECT LicenseNumber FROM OPC_Facility WHERE FacilityID = ? LIMIT 1',
      [facilityId],
    )
    if (facility.length > 0 && facility[0].LicenseNumber) {
      prefix = String(facility[0].LicenseNumber).slice(0, 5)
    }
  }

  let number = ''
  let rows = []
  do {
    const random = crypto.randomInt(0, 1e6).toString().padStart(6, '0')
    number = `${prefix}${random}`
    ;[rows] = await pool.query(
      'SELECT 1 FROM OPC_Card WHERE CardNumber = ? LIMIT 1',
      [number],
    )
    if (rows.length === 0) {
      ;[rows] = await pool.query(
        'SELECT 1 FROM OPC_DriverCard WHERE CardNumber = ? LIMIT 1',
        [number],
      )
    }
  } while (rows.length > 0)
  return number
}

module.exports = {
  generateCustomUUID,
  generateCardNumber,
}
