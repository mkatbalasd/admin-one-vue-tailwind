/* eslint-env node */
const express = require('express')
const router = express.Router()
const pool = require('../db')

// Get all suppliers
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Supplier ORDER BY id DESC')
    res.json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
})

// Add supplier
router.post('/', async (req, res) => {
  const { name } = req.body
  if (!name) return res.status(400).json({ error: 'name required' })
  try {
    const [result] = await pool.query('INSERT INTO Supplier (name) VALUES (?)', [name])
    const [row] = await pool.query('SELECT * FROM Supplier WHERE id = ?', [result.insertId])
    res.status(201).json(row[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
})

// Update supplier
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { name } = req.body
  try {
    await pool.query('UPDATE Supplier SET name = ? WHERE id = ?', [name, id])
    const [rows] = await pool.query('SELECT * FROM Supplier WHERE id = ?', [id])
    res.json(rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
})

// Delete supplier
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM Supplier WHERE id = ?', [req.params.id])
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
})

module.exports = router
