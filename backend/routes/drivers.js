/* eslint-env node */
const express = require('express')
const router = express.Router()
const pool = require('../db')

async function facilityExists(id) {
  const [rows] = await pool.query('SELECT 1 FROM OPC_Facility WHERE FacilityID = ? LIMIT 1', [id])
  return rows.length > 0
}

// Get all drivers
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM OPC_Driver ORDER BY DriverID DESC')
    res.json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
})

// Add driver
router.post('/', async (req, res) => {
  const { FacilityID, FirstName, LastName, IdentityNumber } = req.body
  if (!FirstName || !LastName) return res.status(400).json({ error: 'FirstName and LastName required' })
  try {
    if (FacilityID && !(await facilityExists(FacilityID))) return res.status(400).json({ error: 'Invalid FacilityID' })
    const [result] = await pool.query('INSERT INTO OPC_Driver (FacilityID, FirstName, LastName, IdentityNumber) VALUES (?, ?, ?, ?)', [FacilityID, FirstName, LastName, IdentityNumber])
    const [row] = await pool.query('SELECT * FROM OPC_Driver WHERE DriverID = ?', [result.insertId])
    res.status(201).json(row[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
})

// Update driver
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { FacilityID, FirstName, LastName, IdentityNumber } = req.body
  try {
    if (FacilityID && !(await facilityExists(FacilityID))) return res.status(400).json({ error: 'Invalid FacilityID' })
    await pool.query('UPDATE OPC_Driver SET FacilityID=?, FirstName=?, LastName=?, IdentityNumber=? WHERE DriverID=?', [FacilityID, FirstName, LastName, IdentityNumber, id])
    const [rows] = await pool.query('SELECT * FROM OPC_Driver WHERE DriverID = ?', [id])
    res.json(rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
})

// Delete driver
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM OPC_Driver WHERE DriverID = ?', [req.params.id])
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
})

module.exports = router
