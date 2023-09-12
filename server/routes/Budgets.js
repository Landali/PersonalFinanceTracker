const express = require('express')
const router = express.Router()
const validateToken = require('../middleware/authenticateToken')
const { getBudgets, updateBudget, createBudget, deleteBudget } = require('../controllers/Budget')

router.get('/getBudgets', getBudgets)
router.put('/updateBudget', updateBudget)
router.post('/createBudget', createBudget)
router.delete("/deleteBudget", deleteBudget);
module.exports = router