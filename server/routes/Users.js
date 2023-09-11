const express = require('express')
const router = express.Router()
const validateToken = require('../middleware/authenticateToken')
const { updateProfile } = require('../controllers/Users')



router.post('/updateprofile', validateToken, updateProfile)

module.exports = router