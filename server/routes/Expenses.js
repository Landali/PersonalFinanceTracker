const express = require('express')
const router = express.Router()
const validateToken = require('../middleware/authenticateToken')
const { getExpenses, updateExpenses, createExpenses, deleteExpenses } = require('../controllers/Expenses')

router.get('/getExpenses', validateToken, getExpenses)
router.put('/updateExpenses', validateToken, updateExpenses)
router.post('/createExpenses', validateToken, createExpenses)
router.delete("/deleteExpenses", validateToken, deleteExpenses);
module.exports = router