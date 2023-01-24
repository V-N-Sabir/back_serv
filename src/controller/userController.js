//import ApiError from '../error/ApiError.js'
//import bcrypt from 'bcrypt'
//import jwt from 'jsonwebtoken'
//import Table from '../models/models.js'
const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Table = require('../models/models')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        'secr_kelog', // process.env.SECRET_KEY
        {expiresIn: '24h'}
    )
}

class UserController {
// POST  http://localhost:8080/api/user/registration
//  
    async registration(req, res, next) {
        const {email, password, role} = req.body
        
        //console.log("email=", email, password)

        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email или password'))
        }
        const candidate = await Table.User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await Table.User.create({email, role, password: hashPassword})
        //const basket = await Basket.create({userId: user.id})
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

// POST  http://localhost:8080/api/user/login    
    async login(req, res, next) {
        const {email, password} = req.body

        console.log("email", email)

        const user = await Table.User.findOne(
            {where: {email}}
            
            )
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

// GET  http://localhost:8080/api/user/auth
// userRouter.js - router.get('/auth', authMiddleware, userController.check)

// authMiddleware  - req.user = decoded
// decoded - из токена получаем данные user {id, email, role} - то что закодировали в http://../user/login  
// 1. authMiddleware.js - указать токен в заголовке(Headers).
//{Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6I}

// 2. async check(req, res, next) {...} 
    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

// GET  http://localhost:8080/api/user/  
async apps(req, res) {
   // const {email, password} = req.body

  // const {name} = req.body
    console.log("Work")
   // console.log("email", email)

   // const user = await Table.User.findOne(
    //    {where: {email}}
        
    //    )
  //  if (!user) {
  //      return next(ApiError.internal('Пользователь не найден'))
  //  }
  //  let comparePassword = bcrypt.compareSync(password, user.password)
  //  if (!comparePassword) {
  //      return next(ApiError.internal('Указан неверный пароль'))
  //  }
  //  const token = generateJwt(user.id, user.email, user.role)
    return res.json({message: "Ok"})
}



}

module.exports = new UserController()
