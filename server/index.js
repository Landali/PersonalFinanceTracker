require('dotenv').config(); // this is important!
const express = require('express')

const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())
const db = require('./models')



// Routers
const userRouter = require('./routes/Users')
const authRouter = require('./routes/Auth')
const budgetRouter = require('./routes/Budgets')
const incomeRouter = require('./routes/Incomes')

app.use('/user', userRouter)
app.use('/auth', authRouter)
app.use('/budget', budgetRouter)
app.use('/income', incomeRouter)

db.sequelize.sync().then(() => {
    const port = process.env.SERVER_PORT || 3001
    app.listen(port, () => {
        console.log('Server running at port: ', port)
    }) // selecting port to initialize app
})


