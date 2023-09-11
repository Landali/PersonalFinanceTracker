
const { Users } = require('../models');
const { Op } = require("sequelize");
const { retrieveRegex } = require('../helpers/regex');
const Encrypt = require('../helpers/bycript');
module.exports = {
    async signUp(req, res) {
        console.log('Signing up user ...')
        const user = req.body

        // NOTE: create handler to verify request body
        if (!user.username && !user.email) {
            return res.status(401).json({
                message: 'Error creating user.',
                code: 401,
                messageCode: 'userErr',
            })
        }
        if (!user.password) {
            return res.status(401).json({
                message: 'Error creating user.',
                code: 401,
                messageCode: 'pwdErr',
            })
        }

        const userFound = await Users.findAll({
            where: {
                [Op.or]: [
                    {
                        username: user.username
                    }, {
                        email: user.email
                    }
                ]
            }
        })
        console.log('user found', userFound)

        if (userFound.length > 0) {
            console.warn('User already exist')
            return res.status(401).json({
                message: 'User Exist.',
                code: 401,
                messageCode: 'userExist',
            })
        } else {
            const hashedPassword = await Encrypt.cryptPassword(user.password, 10)
            user.password = hashedPassword
            const newUser = await Users.create(user)

            return res.status(200).json({
                message: 'User created',
                code: 200,
                messageCode: 'userCreated',
            })
        }


    },
    async signIn(req, res) {
        console.log('Signing in user ...')

        const user = req.body  
        const query = { }

        const regex = new RegExp(retrieveRegex('email'));
   
        if (!user.email.match(regex)) {
            query.username = user.username
        } else {
            query.email = user.email
        }
        
        const userFound = await Users.findOne({
            where: query
        })

        if (userFound.dataValues) {
            const validPassword = await Encrypt.comparePassword(user.password, userFound.dataValues.password)
            if (validPassword) return res.send('Login user')
        }
    },
    async updateProfile(req, res) {
        console.log('Updating profile ....', req.body)
        return res.status(200).json({
            message: 'Profile Updated',
            code: 200,
            messageCode: 'ProfileUpt',
            data: req.body.username
        })
    }
}