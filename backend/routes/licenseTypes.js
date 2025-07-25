/* eslint-env node */
const express = require('express')
const router = express.Router()
const pool = require('../db')

// Get all license types
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM OPC_LicenseType ORDER BY LicenseTypeID DESC')
    res.json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
})

// Add license type
router.post('/', async (req, res) => {
  const { LicenseTypeNameAR, LicenseTypeNameEN } = req.body
  if (!LicenseTypeNameAR || !LicenseTypeNameEN) return res.status(400).json({ error: 'All fields required' })
  try {
    const [result] = await pool.query('INSERT INTO OPC_LicenseType (LicenseTypeNameAR, LicenseTypeNameEN) VALUES (?, ?)', [LicenseTypeNameAR, LicenseTypeNameEN])
    const [row] = await pool.query('SELECT * FROM OPC_LicenseType WHERE LicenseTypeID = ?', [result.insertId])
    res.status(201).json(row[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
})

// Update license type
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { LicenseTypeNameAR, LicenseTypeNameEN } = req.body
  try {
    await pool.query('UPDATE OPC_LicenseType SET LicenseTypeNameAR = ?, LicenseTypeNameEN = ? WHERE LicenseTypeID = ?', [LicenseTypeNameAR, LicenseTypeNameEN, id])
    const [rows] = await pool.query('SELECT * FROM OPC_LicenseType WHERE LicenseTypeID = ?', [id])
    res.json(rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
})

// Delete license type
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM OPC_LicenseType WHERE LicenseTypeID = ?', [req.params.id])
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
})

module.exports = router
