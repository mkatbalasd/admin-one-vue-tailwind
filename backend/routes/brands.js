/* eslint-env node */
const express = require('express')
const router = express.Router()
const pool = require('../db')

// Get all brands
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM OPC_Brand ORDER BY BrandID DESC')
    res.json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
})

// Add brand
router.post('/', async (req, res) => {
  const { BrandName, BrandEn } = req.body
  if (!BrandName) return res.status(400).json({ error: 'BrandName required' })
  try {
    const [result] = await pool.query('INSERT INTO OPC_Brand (BrandName, BrandEn) VALUES (?, ?)', [BrandName, BrandEn])
    const [row] = await pool.query('SELECT * FROM OPC_Brand WHERE BrandID = ?', [result.insertId])
    res.status(201).json(row[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
})

module.exports = router
