const JWT = require("jsonwebtoken");
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

        const query = {}

        const regex = new RegExp(retrieveRegex('email'));
        const queryKey = user.user.match(regex) ? 'email' : 'username'
        query[queryKey] = user.user

        const userFound = await Users.findOne({
            where: query
        })

        if (userFound) {
            if (userFound.dataValues) {
                const validPassword = await Encrypt.comparePassword(user.password, userFound.dataValues.password)
                if (validPassword) {
                    const accessToken = await JWT.sign(
                        {
                            username: userFound.dataValues.username,
                            firstname: userFound.dataValues.firstname,
                            lastname: userFound.dataValues.lastname,
                            email: userFound.dataValues.email,
                        },
                        process.env.ACCESS_TOKEN_SECRET,
                        {
                            expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
                        }
                    );
                    return res.status(200).json({
                        message: 'User signin',
                        code: 200,
                        messageCode: 'UseSign',
                        data: accessToken
                    })
                }
            }
        }
        return res.status(404).json({
            message: 'Could not sign in user. User not found.',
            code: 404,
            messageCode: 'NotFound',
            data: {
                username: '',
                firstname: '',
                lastname: '',
                email: '',
            }
        })
    },
    async logout(req, res) {
        res.clearCookie('jwt')
        return res.status(401).json({
            message: 'Sucess logout',
            data: logoutToken
        })
    },
    async verifyAuth(req, res)  {
        console.log('Veryfing if access token is valid ...')
        let token;
        let authHeader = req.headers.Authorization || req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer")) {
            token = authHeader.split(" ")[1];
            JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    if (err.name === 'TokenExpiredError') {
                        return res.status(401).json({
                            error: err.name,
                            message: err.message,
                            token
                        });;
                    }
                    return res.status(401).json({
                        error: err.name,
                        message: err.message,
                        token
                    });;
                }
                return res.status(200).json({
                    error: '',
                    message: 'Token Valid',
                    token
                });;
            })
        } else {
            return res.status(401).json({
                error: 'No token detected',
                message: 'No token detected',
                token
            });;
        }
    
    }
}