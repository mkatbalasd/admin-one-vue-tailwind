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

async function generateCardNumber() {
  let number = ''
  let rows = []
  do {
    number = crypto.randomInt(0, 1e12).toString().padStart(12, '0')
    ;[rows] = await pool.query('SELECT 1 FROM OPC_Card WHERE CardNumber = ? LIMIT 1', [number])
    if (rows.length === 0) {
      ;[rows] = await pool.query('SELECT 1 FROM OPC_DriverCard WHERE CardNumber = ? LIMIT 1', [number])
    }
  } while (rows.length > 0)
  return number
}

module.exports = {
  generateCustomUUID,
  generateCardNumber,
}
