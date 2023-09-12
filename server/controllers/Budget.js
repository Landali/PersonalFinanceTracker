const { Budgets } = require('../models');
const { Op } = require("sequelize");

const Encrypt = require('../helpers/bycript');
module.exports = {
    async getBudgets(req, res) {
        console.log('Retrieving all budgets for user:', req.query)
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

        const { user, pages, sort } = req.query

        if (!user) {
            return res.status(404).json({
                message: 'No user sent',
                code: 200,
                messageCode: 'NOTFOUND',
                data: [],
                pages: 4,
            })
        }

        const query = {
            where: { user },
            order: [
                ['createdAt', 'DESC']
            ]
        }
        if (pages) query.offset = pages
        if (sort) query.limit = sort

        const { rows, count } = await Budgets.findAndCountAll(query)
        console.log('Budget data retrieved: ', rows, count)
        return res.status(200).json({
            message: 'Budgets retrieved',
            code: 200,
            messageCode: 'GetBudgets',
            data: MockData,
            pages: 10,
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
        console.log('Creating budget for user:', req.body)

        const { user, name, description, balance } = req.body
        if (!user || !name || !description || !balance) {
            return res.status(301).json({
                message: 'Invalid budget data.',
                code: 301,
                messageCode: 'INVALIDBUDGET',
                data: []
            })
        }
        const query = {
            where: { user, name }
        }
        const checkBudget = await Budgets.findOne(query)
    
        if (checkBudget) {
            console.warn('Budget found with that name', name, checkBudget.dataValues)
            return res.status(301).json({
                message: 'Budget with same name found',
                code: 301,
                messageCode: 'DUPLICATEBUDGET',
                data: []
            })
        } else {
            const { dataValues: newBudget } = await Budgets.create({
                user, name, description, balance
            })

            if (newBudget) {
                console.log('New Budget created', newBudget)
                return res.status(200).json({
                    message: 'Budgets Created',
                    code: 200,
                    messageCode: 'CreateBudget',
                    data: []
                })
            }
        }

        return res.status(301).json({
            message: 'Budget was not created',
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