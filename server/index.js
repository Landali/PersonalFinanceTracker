const express = require('express')
const app = express()

app.use(express.json())

const db = require('./models')



// Routers
const userRouter = require('./routes/Users')

app.use('/user', userRouter)

db.sequelize.sync().then(()=>{
    app.listen(3001, ()=> {
        console.log('Server running at port 3001')
    }) // selecting port to initialize app
})


