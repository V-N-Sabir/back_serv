const Router = require('express')
const router = new Router()


const pageRouter = require('./pageRouter')



const productRouter = require('./productRouter')
const userRouter = require('./userRouter')
const basketRouter = require('./basketRouter')

const statusRouter = require('./statusRouter')
const docRouter = require('./docRouter')

const rowRouter = require('./rowRouter')

const pageHeadRouter = require('./pheadRouter')

//import pageRouter from '../routes/pageRouter.js' 

//import pageHeadRouter from '../routes/pageHeadRouter.js' 

//import productRouter from './productRouter.js'
//import userRouter from './userRouter.js'
//import basketRouter from './basketRouter.js'

//import statusRouter from './statusRouter.js'
//import docRouter from './docRouter.js'

//import rowRouter from './rowRouter.js'

router.use('/user', userRouter)

router.use('/pagehead', pageHeadRouter)
router.use('/page', pageRouter)
router.use('/product', productRouter)

router.use('/basket', basketRouter)

router.use('/status', statusRouter)
router.use('/doc', docRouter)

router.use('/rows', rowRouter)

/*
import UserRouter from '../routes/userRouter.js'


import docRouter from './docRouter.js'
import RowsController from '../routes/rowRouter.js'
import KontrRouter from '../routes/kontragentRouter.js'

import statusRouter from './statusRouter.js'
import priceProduct from './priceRouter.js'
  //test
router.use('/user', UserRouter)

router.use('/product', ProductRouter)
router.use('/kontragent', KontrRouter)

router.use('/doc', docRouter)
router.use('/rows', RowsController)

router.use('/status', statusRouter)

router.use('/price', priceProduct)
*/


module.exports = router