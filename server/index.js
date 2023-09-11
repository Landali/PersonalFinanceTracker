const express = require('express')
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())
const db = require('./models')



// Routers
const userRouter = require('./routes/Users')
const authRouter = require('./routes/Auth')
app.use('/user', userRouter)
app.use('/auth', authRouter)
db.sequelize.sync().then(()=>{
    app.listen(3001, ()=> {
        console.log('Server running at port 3001')
    }) // selecting port to initialize app
})


