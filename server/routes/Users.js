const express = require('express')
const router = express.Router()
// const { Users } = require('../models')
const { signUp, signIn, updateProfile } = require('../controllers/Users')


router.post('/signin', signIn)
router.post('/signup', signUp)
router.post('/updateprofile', updateProfile)

module.exports = router