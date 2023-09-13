const { Expenses, Budgets } = require('../models');

module.exports = {
    async getExpenses(req, res) {
        console.log('Retrieving user expenses ...', req.query)

        const { user, budget, pages, sort } = req.query

        if (!user || !budget) {
            return res.status(404).json({
                message: 'No expense data sent',
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
        const { rows, count } = await Expenses.findAndCountAll(query)
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
    async updateExpenses(req, res) {
        console.log('Updating user expenses ...', req.body)
        const { user, name, description, total, budget, date, expenseId } = req.body
        if (!user || !total || !description || !name || !budget || !date || !expenseId) {
            return res.status(301).json({
                message: 'Invalid expense data.',
                code: 301,
                messageCode: 'INVALIDINCOME',
                data: []
            })
        }
        const updatedExpense = await Expenses.update(
            { user, name, description, total, date, budget },
            { where: { id: expenseId } }
        ).catch(err => {
            console.error('Updating error', {
                type: err.type,
                message: err.message
            })
            return res.status(401).json({
                message: 'Error updating expense',
                code: 401,
                messageCode: 'ErrUpdateBudget',
                data: []
            })
        })
        if (updatedExpense) {
            console.log('Expense updated', updatedExpense)
            const query = {
                where: { user, name: budget }
            }
            const expenseBudget = await Budgets.findOne(query)
            if (expenseBudget) {
                const updateBudgetBalance = await Budgets.update({ balance: parseInt(expenseBudget.dataValues.balance) + parseInt(total) },
                    { where: { name: budget, user } })
                if (updateBudgetBalance) {
                    return res.status(200).json({
                        message: 'Expense successfully updated',
                        code: 200,
                        messageCode: 'CreateExpense',
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
    async createExpenses(req, res) {
        console.log('Creating user expenses ...', req.body)
        const { name, user, total, description, budget, date } = req.body
        if (!user || !total || !description || !name || !budget || !date) {
            return res.status(301).json({
                message: 'Invalid expense data.',
                code: 301,
                messageCode: 'INVALIDEXPENSE',
                data: []
            })
        }


        const { dataValues: newExpense } = await Expenses.create({
            name, user, total: parseInt(total), description, budget, date
        })

        if (newExpense) {
            console.log('New Expense created', newExpense)

            const query = {
                where: { user, name: budget }
            }
            const expenseBudget = await Budgets.findOne(query)
            if (expenseBudget) {
                const updateBudgetBalance = await Budgets.update({ balance: parseInt(expenseBudget.dataValues.balance) + parseInt(total) },
                    { where: { name: budget, user } })
                if (updateBudgetBalance) {
                    return res.status(200).json({
                        message: 'Expense successfully created',
                        code: 200,
                        messageCode: 'CREATEEXPENSE',
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
    async deleteExpenses(req, res) {
        console.log('Deleting user expenses ...', req.body)
        const { expense, budget, user, total } = req.body
        if (!expense || !budget || !user || !total) {
            return res.status(301).json({
                message: 'Invalid Expense Data',
                code: 301,
                messageCode: 'INVALIDEXPENSE',
                data: []
            })
        }

        const expenseQuery = {
            where: { id: expense, budget, user }
        }
        const deleteExpense = await Expenses.destroy(expenseQuery)

        console.log('Deleted Expense', deleteExpense)
        if (deleteExpense) {
            const query = {
                where: { user, name: budget }
            }
            const expenseBudget = await Budgets.findOne(query)
            if (expenseBudget) {
                const newBalance = parseInt(expenseBudget.dataValues.balance) - parseInt(total)

                const updateBudgetBalance = await Budgets.update({ balance: newBalance < 0 ? 0 : newBalance  },
                    { where: { name: budget, user } })
                if (updateBudgetBalance) {
                    return res.status(200).json({
                        message: 'Expense successfully deleted',
                        code: 200,
                        messageCode: 'CREATEEXPENSE',
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
                message: 'Expense not found',
                code: 301,
                messageCode: 'NotDeleteBudget',
                data: []
            })
        }

    }
}