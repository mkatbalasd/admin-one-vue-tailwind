/* eslint-env node */
const express = require('express')
const router = express.Router()
const pool = require('../db')

// Get all colors
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM OPC_Color ORDER BY ColorID DESC')
    res.json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
})

// Add color
router.post('/', async (req, res) => {
  const { ColorName, ColorEn } = req.body
  if (!ColorName) return res.status(400).json({ error: 'ColorName required' })
  try {
    const [result] = await pool.query('INSERT INTO OPC_Color (ColorName, ColorEn) VALUES (?, ?)', [ColorName, ColorEn])
    const [row] = await pool.query('SELECT * FROM OPC_Color WHERE ColorID = ?', [result.insertId])
    res.status(201).json(row[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
})

// Update color
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { ColorName, ColorEn } = req.body
  try {
    await pool.query('UPDATE OPC_Color SET ColorName = ?, ColorEn = ? WHERE ColorID = ?', [ColorName, ColorEn, id])
    const [rows] = await pool.query('SELECT * FROM OPC_Color WHERE ColorID = ?', [id])
    res.json(rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
})

// Delete color
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM OPC_Color WHERE ColorID = ?', [req.params.id])
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
})

module.exports = router
