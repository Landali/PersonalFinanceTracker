const express = require('express')
const router = express.Router()
const validateToken = require('../middleware/authenticateToken')
const { getBudgets, updateBudget, createBudget, deleteBudget } = require('../controllers/Budget')

router.get('/getBudgets', validateToken, getBudgets)
router.put('/updateBudget', validateToken, updateBudget)
router.post('/createBudget', validateToken, createBudget)
router.delete("/deleteBudget", deleteBudget);
module.exports = router