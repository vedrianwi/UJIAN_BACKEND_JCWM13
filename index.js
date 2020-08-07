//import module
const express = require('express')
const cors = require('cors')
const bodyparser=require('body-parser')
const dotenv = require('dotenv')
//create app
const app = express()
dotenv.config()

//apply middleware
app.use(cors())
app.use(bodyparser.json())

const database = require('./database')

database.connect((err) => {
    if(err) {
        console.log(err)
    }
    console.log(`DB connected as id : ${database.threadId}`)
})


//HOME ROUTE
app.get('/', (req, res) => {
    res.status(200).send('<h1>masukcoy</h1>')
})

//user route
const { productCategoryRouter, userRouter, productRouter } = require('./routers')
app.use('/api', productCategoryRouter)
app.use('/api', userRouter)
app.use('/api', productRouter)

//bind localhost
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`server is running at : ${PORT}`))