const express = require('express')
const router = express.Router()
const validateToken = require('../middleware/authenticateToken')
const { getIncomes, updateIncomes, createIncomes, deleteIncomes } = require('../controllers/Incomes')

router.get('/getIncomes', validateToken, getIncomes)
router.put('/updateIncomes', validateToken, updateIncomes)
router.post('/createIncomes', validateToken, createIncomes)
router.delete("/deleteIncomes", validateToken, deleteIncomes);
module.exports = router