const { Budgets } = require('../models');
const { Op } = require("sequelize");

const Encrypt = require('../helpers/bycript');
module.exports = {
    async getBudgets(req, res) { 
        console.log('Retrieving all budgets for user:', req.body.user)
        const MockData = [
            {
                name: 'Mock Budget 1',
                balance: 100,
                description: 'Mock Budget 1 Description. Here should be a brief description of the budget.',
            },
            {
                name: 'Mock Budget 2',
                balance: 200,
                description: 'Mock Budget 2 Description. Here should be a brief description of the budget.',
            },
            {
                name: 'Mock Budget 3',
                balance: 300,
                description: 'Mock Budget 3 Description. Here should be a brief description of the budget.',
            },
            {
                name: 'Mock Budget 4',
                balance: 400,
                description: 'Mock Budget 4 Description. Here should be a brief description of the budget.',
            }
        ]
        return res.status(200).json({
            message: 'Budgets retrieved',
            code: 200,
            messageCode: 'GetBudgets',
            data: MockData
        })
    },
    async updateBudget(req, res) { 
        console.log('Updating budget for user:', req.body.user)
        return res.status(200).json({
            message: 'Budgets Updated',
            code: 200,
            messageCode: 'UpdateBudget',
            data: []
        })
    },
    async createBudget(req, res) { 
        console.log('Creating budget for user:', req.body.user)
        return res.status(200).json({
            message: 'Budgets Created',
            code: 200,
            messageCode: 'CreateBudget',
            data: []
        })
    },
    async deleteBudget(req, res) {
        console.log('Deleting budget for user:', req.body.user)
        return res.status(200).json({
            message: 'Budgets Delete',
            code: 200,
            messageCode: 'DeleteBudget',
            data: []
        })
    }
}