const { Users } = require('../models');
const { Op } = require("sequelize");

const Encrypt = require('../helpers/bycript');
module.exports = {
    async updateProfile(req, res) {
        console.log('Updating profile ....', req.body)
        const user = req.body
        const { username, email, password, firstname, lastname } = user
        if (!username) {
            return res.status(401).json({
                message: 'Invalid user data. Please send all your profile',
                code: 401,
                messageCode: 'InvalidProfile',
            })
        }


        const query = {}
        if (password || password !== '') {
            const hashedPassword = await Encrypt.cryptPassword(user.password, 10)
            query.password = hashedPassword
        } 
        if (email) query.email
        if (firstname) query.firstname
        if (lastname) query.lastname

        const updatedUser = await Users.update(
            query,
            { where: { username: username } }
        ).catch(err => {
            console.error('Updating user error', {
                type: err.type,
                message: err.message
            })
        })

        if (updatedUser) {
            return res.status(200).json({
                message: 'Profile Updated',
                code: 200,
                messageCode: 'ProfileUpt',
                data: req.body
            })
        } else {
            return res.status(401).json({
                message: 'User profile was not updated.',
                code: 200,
                messageCode: 'NOTPROFILEUPDATE',
                data: updatedUser.dataValues
            })
        }



    },
}