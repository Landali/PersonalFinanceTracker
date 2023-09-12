module.exports = (sequelize, DataTypes) => {

    const Budgets = sequelize.define("Budgets", {
        name: {
            type:DataTypes.STRING,
            allowNull: false
        },
        balance: {
            type:DataTypes.DECIMAL,
            allowNull: false
        },
        description: {
            type:DataTypes.STRING,
            allowNull: false
        },
        user: {
            type:DataTypes.STRING,
            allowNull: false
        }
    })
        return Budgets
}