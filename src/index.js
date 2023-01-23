//require('dotenv').config() // commonJS
//import {} from 'dotenv/config' // module

//++
const express = require('express')
const sequelize = require('./db')
const cors = require('cors')
const path = require('path')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const models = require('./models/models')

//++
//import express from "express"
//import sequelize from "./db"
//import cors from 'cors'
//import path from 'path'
//import fileUpload from "express-fileupload"
//---------import userRouter from "./routes/docRouter.js"
//import router from "./routes/index.js"
//import models from './models/models.js'



const PORT = process.env.PORT || 8080

const app = express()

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log("Ошибка", e)
    }
}

app.use(cors())
app.use(express.json()) 
//app.use(express.urlencoded({extended: false}))

app.use(express.static(path.resolve("./", 'static')))
// ++ app.use(express.static(path.resolve('D:/JavaScript/REACT JS/React JS Ulbu TV/React JS Интернет-Магазин/server_m/static')))
app.use(fileUpload({}))

app.use('/api', router)

start()
//models()