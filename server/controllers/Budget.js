const { Budgets } = require('../models');
const { Op } = require("sequelize");

const Encrypt = require('../helpers/bycript');
module.exports = {
    async getBudgets(req, res) {
        console.log('Retrieving all budgets for user:', req.query)

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
        console.log('Budget data retrieved: ', count)
        const my_budgets = rows.slice(0, 4);
        if (rows.length > 0) {
            return res.status(200).json({
                message: 'Budgets retrieved',
                code: 200,
                messageCode: 'GetBudgets',
                data: my_budgets,
                pages: count === 0 ? 4 : count,
            })
        } else {
            return res.status(200).json({
                message: 'No budgets found',
                code: 200,
                messageCode: 'GetBudgets',
                data: [],
                pages: 4,
            })
        }
    },
    async updateBudget(req, res) {
        console.log('Updating budget for user:', req.body)
        const { user, name, description, balance, budgetId } = req.body
        if (!user || !name || !description || !balance || !budgetId) {
            return res.status(301).json({
                message: 'Invalid budget data.',
                code: 301,
                messageCode: 'INVALIDBUDGET',
                data: []
            })
        }

        const updatedBudget = await Budgets.update(
            { user, name, description, balance },
            { where: { id: budgetId } }
        ).catch(err => {
            console.error('Updating error', {
                type: err.type,
                message: err.message
            })
            return res.status(401).json({
                message: 'Error updating budget',
                code: 401,
                messageCode: 'ErrUpdateBudget',
                data: []
            })
        })

        if (updatedBudget) {
            console.log('Budget updated ..', updatedBudget)
            return res.status(200).json({
                message: 'Budgets Updated',
                code: 200,
                messageCode: 'UpdateBudget',
                data: []
            })
        } else {
            return res.status(301).json({
                message: 'Budget was not updating correctly',
                code: 301,
                messageCode: 'NotUpdateBudget',
                data: []
            })
        }
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