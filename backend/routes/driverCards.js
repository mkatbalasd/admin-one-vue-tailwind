/* eslint-env node */
const express = require('express')
const router = express.Router()
const pool = require('../db')
const { generateCustomUUID, generateCardNumber } = require('../controllers/helpers')

async function facilityExists(id) {
  const [rows] = await pool.query('SELECT 1 FROM OPC_Facility WHERE FacilityID = ? LIMIT 1', [id])
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

// Get all driver cards
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM OPC_DriverCard ORDER BY ID DESC')
    res.json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
})

// Add driver card
router.post('/', async (req, res) => {
  let { CardType, FacilityID, DriverID, IssueDate, ExpirationDate, Supplier, addingDate, LastUpdate, userID } = req.body
  try {
    if (FacilityID && !(await facilityExists(FacilityID))) return res.status(400).json({ error: 'Invalid FacilityID' })
    if (DriverID && !(await driverExists(DriverID))) return res.status(400).json({ error: 'Invalid DriverID' })
    if (Supplier && !(await supplierExists(Supplier))) return res.status(400).json({ error: 'Invalid Supplier' })
    const token = await generateCustomUUID()
    const CardNumber = await generateCardNumber(FacilityID)
    const today = new Date().toISOString().split('T')[0]
    if (!addingDate) addingDate = today
    if (!LastUpdate) LastUpdate = today
    const [result] = await pool.query(
      'INSERT INTO OPC_DriverCard (token, CardNumber, CardType, FacilityID, DriverID, IssueDate, ExpirationDate, Supplier, addingDate, LastUpdate, userID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [token, CardNumber, CardType, FacilityID, DriverID, IssueDate, ExpirationDate, Supplier, addingDate, LastUpdate, userID],
    )
    const [row] = await pool.query('SELECT * FROM OPC_DriverCard WHERE ID = ?', [result.insertId])
    res.status(201).json(row[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
})

// Update driver card
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { CardNumber, CardType, FacilityID, DriverID, IssueDate, ExpirationDate, Supplier, userID } = req.body
  try {
    if (FacilityID && !(await facilityExists(FacilityID))) return res.status(400).json({ error: 'Invalid FacilityID' })
    if (DriverID && !(await driverExists(DriverID))) return res.status(400).json({ error: 'Invalid DriverID' })
    if (Supplier && !(await supplierExists(Supplier))) return res.status(400).json({ error: 'Invalid Supplier' })
    const today = new Date().toISOString().split('T')[0]
    await pool.query('UPDATE OPC_DriverCard SET CardNumber=?, CardType=?, FacilityID=?, DriverID=?, IssueDate=?, ExpirationDate=?, Supplier=?, LastUpdate=?, userID=? WHERE ID=?', [CardNumber, CardType, FacilityID, DriverID, IssueDate, ExpirationDate, Supplier, today, userID, id])
    const [rows] = await pool.query('SELECT * FROM OPC_DriverCard WHERE ID = ?', [id])
    res.json(rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
})

// Delete driver card
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM OPC_DriverCard WHERE ID = ?', [req.params.id])
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
})

module.exports = router
