const express = require('express')
const router = express.Router()
const validateToken = require('../middleware/authenticateToken')
const { signUp, signIn, logout, verifyAuth } = require('../controllers/Auth')

router.post('/signin', signIn)
router.post('/signup', signUp)
router.post('/logout', logout)
router.get("/checkAuth", verifyAuth);
module.exports = router