const express = require('express')
const router = express.Router()
const validateToken = require('../middleware/authenticateToken')
const { updateProfile } = require('../controllers/Users')



router.put('/updateprofile', validateToken, updateProfile)

module.exports = router