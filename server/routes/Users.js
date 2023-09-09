const express = require('express')
const router = express.Router()
// const { Users } = require('../models')
const { signUp, signIn } = require('../controllers/Users')


router.get('/signin', signIn)
router.post('/signup', signUp)


module.exports = router