const { Users } = require('../models');
const { Op } = require("sequelize");

const Encrypt = require('../helpers/bycript');
module.exports = {
    async updateProfile(req, res) {
        console.log('Updating profile ....', req.body)

            return res.status(200).json({
                message: 'Profile Updated',
                code: 200,
                messageCode: 'ProfileUpt',
                data: req.body
            })
        
    },
}