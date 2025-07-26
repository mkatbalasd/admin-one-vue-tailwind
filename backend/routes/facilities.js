/* eslint-env node */
const express = require('express')
const router = express.Router()
const pool = require('../db')

async function licenseTypeExists(id) {
  const [rows] = await pool.query('SELECT 1 FROM OPC_LicenseType WHERE LicenseTypeID = ? LIMIT 1', [id])
  return rows.length > 0
}

// Get all facilities
router.get('/', async (req, res) => {
  const {
    search = null,
    limit = 10,
    offset = 0,
  } = req.query

  const lim = Number.parseInt(limit, 10)
  const off = Number.parseInt(offset, 10)

  try {
    const [rows] = await pool.query(
      `SELECT * FROM OPC_Facility
       WHERE (? IS NULL OR IdentityNumber LIKE CONCAT('%', ?, '%')
              OR Name LIKE CONCAT('%', ?, '%'))
       ORDER BY FacilityID DESC
       LIMIT ? OFFSET ?`,
      [search, search, search, lim, off],
    )
    res.json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
})

// Add facility
router.post('/', async (req, res) => {
  const { IdentityNumber, Name, EnglishName, LicenseNumber, LicenseTypeID, LicenseType, LicenseCity, LicenseCityEn, LicenseIssueDate, LicenseExpirationDate } = req.body
  if (!IdentityNumber || !Name) return res.status(400).json({ error: 'IdentityNumber and Name required' })
  try {
    if (LicenseTypeID && !(await licenseTypeExists(LicenseTypeID))) return res.status(400).json({ error: 'Invalid LicenseTypeID' })
    const [result] = await pool.query('INSERT INTO OPC_Facility (IdentityNumber, Name, EnglishName, LicenseNumber, LicenseTypeID, LicenseType, LicenseCity, LicenseCityEn, LicenseIssueDate, LicenseExpirationDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [IdentityNumber, Name, EnglishName, LicenseNumber, LicenseTypeID, LicenseType, LicenseCity, LicenseCityEn, LicenseIssueDate, LicenseExpirationDate])
    const [row] = await pool.query('SELECT * FROM OPC_Facility WHERE FacilityID = ?', [result.insertId])
    res.status(201).json(row[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
})

// Update facility
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { IdentityNumber, Name, EnglishName, LicenseNumber, LicenseTypeID, LicenseType, LicenseCity, LicenseCityEn, LicenseIssueDate, LicenseExpirationDate } = req.body
  try {
    if (LicenseTypeID && !(await licenseTypeExists(LicenseTypeID))) return res.status(400).json({ error: 'Invalid LicenseTypeID' })
    await pool.query('UPDATE OPC_Facility SET IdentityNumber=?, Name=?, EnglishName=?, LicenseNumber=?, LicenseTypeID=?, LicenseType=?, LicenseCity=?, LicenseCityEn=?, LicenseIssueDate=?, LicenseExpirationDate=? WHERE FacilityID=?', [IdentityNumber, Name, EnglishName, LicenseNumber, LicenseTypeID, LicenseType, LicenseCity, LicenseCityEn, LicenseIssueDate, LicenseExpirationDate, id])
    const [rows] = await pool.query('SELECT * FROM OPC_Facility WHERE FacilityID = ?', [id])
    res.json(rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
})

// Delete facility
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM OPC_Facility WHERE FacilityID = ?', [req.params.id])
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
})

module.exports = router
