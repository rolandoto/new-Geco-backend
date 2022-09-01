const express = require('express')
const cors = require('cors')
const AuthRouter = require('./Routes/Routes')
const { dbConnection } = require('./database/database')
require('dotenv').config()
const path = require("path")
const app =express()

const fetch = require("node-fetch")

let port = process.env.PORT || 8080;
app.use('/public',express.static(`${__dirname}/Storage/Imgs`))
app.use(express.json())
app.use(cors())
//rolanod

app.use('/api/auth',AuthRouter.router)

dbConnection()

app.listen(port,() =>{
    console.log('server connect prot 4000')
})

