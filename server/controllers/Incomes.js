const { Incomes } = require('../models');

module.exports = {
    async getIncomes(req, res) {
        console.log('Retrieving user incomes ...')
    },
    async updateIncomes(req, res) {
        console.log('Updating user incomes ...')
    },
    async createIncomes(req, res) {
        console.log('Creating user incomes ...')
    },
    async deleteIncomes(req, res) {
        console.log('Deleting user incomes ...')
    }
}