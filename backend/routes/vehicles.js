/* eslint-env node */
const express = require('express')
const router = express.Router()
const pool = require('../db')

async function brandExists(id) {
  const [rows] = await pool.query('SELECT 1 FROM OPC_Brand WHERE BrandID = ? LIMIT 1', [id])
  return rows.length > 0
}
async function modelExists(id) {
  const [rows] = await pool.query('SELECT 1 FROM OPC_Model WHERE ModelID = ? LIMIT 1', [id])
  return rows.length > 0
}
async function colorExists(id) {
  const [rows] = await pool.query('SELECT 1 FROM OPC_Color WHERE ColorID = ? LIMIT 1', [id])
  return rows.length > 0
}
async function facilityExists(id) {
  const [rows] = await pool.query('SELECT 1 FROM OPC_Facility WHERE FacilityID = ? LIMIT 1', [id])
  return rows.length > 0
}

// Get all vehicles
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM OPC_Vehicle ORDER BY ID DESC')
    res.json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
})

// Add vehicle
router.post('/', async (req, res) => {
  const { BrandID, ModelID, ColorID, PlateNumber, SerialNumber, ManufacturingYear, FacilityID } = req.body
  try {
    if (BrandID && !(await brandExists(BrandID))) return res.status(400).json({ error: 'Invalid BrandID' })
    if (ModelID && !(await modelExists(ModelID))) return res.status(400).json({ error: 'Invalid ModelID' })
    if (ColorID && !(await colorExists(ColorID))) return res.status(400).json({ error: 'Invalid ColorID' })
    if (FacilityID && !(await facilityExists(FacilityID))) return res.status(400).json({ error: 'Invalid FacilityID' })
    const [result] = await pool.query('INSERT INTO OPC_Vehicle (BrandID, ModelID, ColorID, PlateNumber, SerialNumber, ManufacturingYear, FacilityID) VALUES (?, ?, ?, ?, ?, ?, ?)', [BrandID, ModelID, ColorID, PlateNumber, SerialNumber, ManufacturingYear, FacilityID])
    const [row] = await pool.query('SELECT * FROM OPC_Vehicle WHERE ID = ?', [result.insertId])
    res.status(201).json(row[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
})

// Update vehicle
router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { BrandID, ModelID, ColorID, PlateNumber, SerialNumber, ManufacturingYear, FacilityID } = req.body
  try {
    if (BrandID && !(await brandExists(BrandID))) return res.status(400).json({ error: 'Invalid BrandID' })
    if (ModelID && !(await modelExists(ModelID))) return res.status(400).json({ error: 'Invalid ModelID' })
    if (ColorID && !(await colorExists(ColorID))) return res.status(400).json({ error: 'Invalid ColorID' })
    if (FacilityID && !(await facilityExists(FacilityID))) return res.status(400).json({ error: 'Invalid FacilityID' })
    await pool.query('UPDATE OPC_Vehicle SET BrandID=?, ModelID=?, ColorID=?, PlateNumber=?, SerialNumber=?, ManufacturingYear=?, FacilityID=? WHERE ID=?', [BrandID, ModelID, ColorID, PlateNumber, SerialNumber, ManufacturingYear, FacilityID, id])
    const [rows] = await pool.query('SELECT * FROM OPC_Vehicle WHERE ID = ?', [id])
    res.json(rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
})

// Delete vehicle
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM OPC_Vehicle WHERE ID = ?', [req.params.id])
    res.json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
})

module.exports = router
