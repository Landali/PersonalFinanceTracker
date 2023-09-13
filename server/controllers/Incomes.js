const { Incomes, Budgets } = require('../models');

module.exports = {
    async getIncomes(req, res) {
        console.log('Retrieving user incomes ...', req.query)

        const { user, budget, pages, sort } = req.query

        if (!user || !budget) {
            return res.status(404).json({
                message: 'No income data sent',
                code: 200,
                messageCode: 'NOTFOUND',
                data: [],
                pages: 6,
            })
        }

        const query = {
            where: { user, budget },
            order: [
                ['createdAt', 'ASC']
            ]
        }
        if (pages) query.offset = parseInt(pages)
        if (sort) query.limit = parseInt(sort)
        console.log('query', query)
        const { rows, count } = await Incomes.findAndCountAll(query)
        console.log('Budget data retrieved: ', count)
        let my_budgets = rows
        if (!pages & !sort) {
            my_budgets = rows.slice(0, 6);
        }
        if (rows.length > 0) {
            return res.status(200).json({
                message: 'Budgets retrieved',
                code: 200,
                messageCode: 'GetBudgets',
                data: my_budgets,
                pages: count === 0 ? 6 : count,
            })
        } else {
            return res.status(200).json({
                message: 'No budgets found',
                code: 200,
                messageCode: 'GetBudgets',
                data: [],
                pages: 6,
            })
        }
    },
    async updateIncomes(req, res) {
        console.log('Updating user incomes ...')
        const { user, name, description, total, budget, date, incomeId } = req.body
        if (!user || !total || !description || !name || !budget || !date || !incomeId) {
            return res.status(301).json({
                message: 'Invalid income data.',
                code: 301,
                messageCode: 'INVALIDINCOME',
                data: []
            })
        }
        const updatedIncome = await Incomes.update(
            { user, name, description, total, date, budget },
            { where: { id: incomeId } }
        ).catch(err => {
            console.error('Updating error', {
                type: err.type,
                message: err.message
            })
            return res.status(401).json({
                message: 'Error updating income',
                code: 401,
                messageCode: 'ErrUpdateBudget',
                data: []
            })
        })
        if (updatedIncome) {
            console.log('Income updated', updatedIncome)
            const query = {
                where: { user, name: budget }
            }
            const incomeBudget = await Budgets.findOne(query)
            if (incomeBudget) {
                const updateBudgetBalance = await Budgets.update({ balance: parseInt(incomeBudget.dataValues.balance) + parseInt(total) },
                    { where: { name: budget, user } })
                if (updateBudgetBalance) {
                    return res.status(200).json({
                        message: 'Income successfully updated',
                        code: 200,
                        messageCode: 'CreateIncome',
                        data: []
                    })
                }
            }
            return res.status(301).json({
                message: 'Budget balance not updated',
                code: 301,
                messageCode: 'NOTUPDATED',
                data: []
            })
        }

        return res.status(301).json({
            message: 'Budget was not created',
            code: 301,
            messageCode: 'CreateBudget',
            data: []
        })
    },
    async createIncomes(req, res) {
        console.log('Creating user incomes ...', req.body)
        const { name, user, total, description, budget, date } = req.body
        if (!user || !total || !description || !name || !budget || !date) {
            return res.status(301).json({
                message: 'Invalid income data.',
                code: 301,
                messageCode: 'INVALIDINCOME',
                data: []
            })
        }


        const { dataValues: newIncome } = await Incomes.create({
            name, user, total: parseInt(total), description, budget, date
        })

        if (newIncome) {
            console.log('New Income created', newIncome)

            const query = {
                where: { user, name: budget }
            }
            const incomeBudget = await Budgets.findOne(query)
            console.log('Income budget', incomeBudget)
            if (incomeBudget) {
                const updateBudgetBalance = await Budgets.update({ balance: parseInt(incomeBudget.dataValues.balance) + parseInt(total) },
                    { where: { name: budget, user } })
                if (updateBudgetBalance) {
                    return res.status(200).json({
                        message: 'Income successfully created',
                        code: 200,
                        messageCode: 'CreateIncome',
                        data: []
                    })
                }
            }
            return res.status(301).json({
                message: 'Budget balance not updated',
                code: 301,
                messageCode: 'NOTUPDATED',
                data: []
            })
        }


        return res.status(301).json({
            message: 'Budget was not created',
            code: 200,
            messageCode: 'CreateBudget',
            data: []
        })
    },
    async deleteIncomes(req, res) {
        console.log('Deleting user incomes ...', req.body)
        const { income, budget, user, total } = req.body
        if (!income || !budget || !user || !total) {
            return res.status(301).json({
                message: 'Invalid Income Data',
                code: 301,
                messageCode: 'INVALIDINCOME',
                data: []
            })
        }

        const incomeQuery = {
            where: { id: income, budget, user }
        }
        const deleteIncome = await Incomes.destroy(incomeQuery)

        console.log('Deleted Income', deleteIncome)
        if (deleteIncome) {
            const query = {
                where: { user, name: budget }
            }
            const incomeBudget = await Budgets.findOne(query)
            if (incomeBudget) {
                const newBalance = parseInt(incomeBudget.dataValues.balance) - parseInt(total)

                const updateBudgetBalance = await Budgets.update({ balance: newBalance < 0 ? 0 : newBalance  },
                    { where: { name: budget, user } })
                if (updateBudgetBalance) {
                    return res.status(200).json({
                        message: 'Income successfully deleted',
                        code: 200,
                        messageCode: 'CreateIncome',
                        data: []
                    })
                }
            }
            return res.status(301).json({
                message: 'Budget balance not updated',
                code: 301,
                messageCode: 'NOTUPDATED',
                data: []
            })
        } else {
            return res.status(301).json({
                message: 'Income not found',
                code: 301,
                messageCode: 'NotDeleteBudget',
                data: []
            })
        }

    }
}