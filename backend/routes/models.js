/* eslint-env node */
const express = require('express')
const router = express.Router()
const pool = require('../db')

// Helper to validate brand
async function brandExists(id) {
  const [rows] = await pool.query('SELECT 1 FROM OPC_Brand WHERE BrandID = ? LIMIT 1', [id])
  return rows.length > 0
}

// Get all models
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM OPC_Model ORDER BY ModelID DESC')
    res.json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
})

// Add model
router.post('/', async (req, res) => {
  const { ModelName, ModelEn, BrandID } = req.body
  if (!ModelName || BrandID == null) return res.status(400).json({ error: 'ModelName and BrandID required' })
  try {
    if (!(await brandExists(BrandID))) return res.status(400).json({ error: 'Invalid BrandID' })
    const [result] = await pool.query('INSERT INTO OPC_Model (ModelName, ModelEn, BrandID) VALUES (?, ?, ?)', [ModelName, ModelEn, BrandID])
    const [row] = await pool.query('SELECT * FROM OPC_Model WHERE ModelID = ?', [result.insertId])
    res.status(201).json(row[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
})

// Update model
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { ModelName, ModelEn, BrandID } = req.body
  try {
    if (BrandID != null && !(await brandExists(BrandID))) return res.status(400).json({ error: 'Invalid BrandID' })
    await pool.query('UPDATE OPC_Model SET ModelName = ?, ModelEn = ?, BrandID = ? WHERE ModelID = ?', [ModelName, ModelEn, BrandID, id])
    const [rows] = await pool.query('SELECT * FROM OPC_Model WHERE ModelID = ?', [id])
    res.json(rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
})

// Delete model
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM OPC_Model WHERE ModelID = ?', [req.params.id])
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
})

module.exports = router
