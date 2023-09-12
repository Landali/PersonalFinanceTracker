const express = require('express')
const router = express.Router()
const validateToken = require('../middleware/authenticateToken')
const { getIncomes, updateIncomes, createIncomes, deleteIncomes } = require('../controllers/Incomes')

router.get('/getIncomes', getIncomes)
router.put('/updateIncomes', updateIncomes)
router.post('/createIncomes', createIncomes)
router.delete("/deleteIncomes", deleteIncomes);
module.exports = router