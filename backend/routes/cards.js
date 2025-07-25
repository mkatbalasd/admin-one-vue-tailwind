/* eslint-env node */
const express = require('express')
const router = express.Router()
const pool = require('../db')

async function facilityExists(id) {
  const [rows] = await pool.query('SELECT 1 FROM OPC_Facility WHERE FacilityID = ? LIMIT 1', [id])
  return rows.length > 0
}
async function vehicleExists(id) {
  const [rows] = await pool.query('SELECT 1 FROM OPC_Vehicle WHERE ID = ? LIMIT 1', [id])
  return rows.length > 0
}
async function driverExists(id) {
  const [rows] = await pool.query('SELECT 1 FROM OPC_Driver WHERE DriverID = ? LIMIT 1', [id])
  return rows.length > 0
}
async function supplierExists(id) {
  const [rows] = await pool.query('SELECT 1 FROM Supplier WHERE id = ? LIMIT 1', [id])
  return rows.length > 0
}

// Get all cards
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM OPC_Card ORDER BY ID DESC')
    res.json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
})

// Add card
router.post('/', async (req, res) => {
  const { CardNumber, FacilityID, VehicleID, DriverID, IssueDate, ExpirationDate, RenewalDate, Supplier, addingDate, LastUpdate, userID } = req.body
  if (!CardNumber || FacilityID == null || VehicleID == null) return res.status(400).json({ error: 'CardNumber, FacilityID and VehicleID required' })
  try {
    if (!(await facilityExists(FacilityID))) return res.status(400).json({ error: 'Invalid FacilityID' })
    if (!(await vehicleExists(VehicleID))) return res.status(400).json({ error: 'Invalid VehicleID' })
    if (DriverID && !(await driverExists(DriverID))) return res.status(400).json({ error: 'Invalid DriverID' })
    if (Supplier && !(await supplierExists(Supplier))) return res.status(400).json({ error: 'Invalid Supplier' })
    const [result] = await pool.query('INSERT INTO OPC_Card (CardNumber, FacilityID, VehicleID, DriverID, IssueDate, ExpirationDate, RenewalDate, Supplier, addingDate, LastUpdate, userID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [CardNumber, FacilityID, VehicleID, DriverID, IssueDate, ExpirationDate, RenewalDate, Supplier, addingDate, LastUpdate, userID])
    const [row] = await pool.query('SELECT * FROM OPC_Card WHERE ID = ?', [result.insertId])
    res.status(201).json(row[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
})

// Update card
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { CardNumber, FacilityID, VehicleID, DriverID, IssueDate, ExpirationDate, RenewalDate, Supplier, addingDate, LastUpdate, userID } = req.body
  try {
    if (FacilityID && !(await facilityExists(FacilityID))) return res.status(400).json({ error: 'Invalid FacilityID' })
    if (VehicleID && !(await vehicleExists(VehicleID))) return res.status(400).json({ error: 'Invalid VehicleID' })
    if (DriverID && !(await driverExists(DriverID))) return res.status(400).json({ error: 'Invalid DriverID' })
    if (Supplier && !(await supplierExists(Supplier))) return res.status(400).json({ error: 'Invalid Supplier' })
    await pool.query('UPDATE OPC_Card SET CardNumber=?, FacilityID=?, VehicleID=?, DriverID=?, IssueDate=?, ExpirationDate=?, RenewalDate=?, Supplier=?, addingDate=?, LastUpdate=?, userID=? WHERE ID=?', [CardNumber, FacilityID, VehicleID, DriverID, IssueDate, ExpirationDate, RenewalDate, Supplier, addingDate, LastUpdate, userID, id])
    const [rows] = await pool.query('SELECT * FROM OPC_Card WHERE ID = ?', [id])
    res.json(rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
})

// Delete card
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM OPC_Card WHERE ID = ?', [req.params.id])
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
})

module.exports = router
