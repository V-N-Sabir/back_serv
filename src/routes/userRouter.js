


const Router = require('express')
const router = new Router()

const userController = require('../controller/userController')
const authMiddleware = require('../middleware/authMiddleware')


//import Router from 'express'
//import userController from '../controller/userController.js'
//import authMiddleware from '../middleware/authMiddleware.js'

router.get('/', userController.apps)
router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)

module.exports = router