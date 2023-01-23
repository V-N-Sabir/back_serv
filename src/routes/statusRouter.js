

const Router = require('express')
const router = new Router()

const statusController = require('../controller/statusController')
const authMiddleware = require('../middleware/authMiddleware')
//import statusController from '../controller/statusController.js'
//import authMiddleware from '../middleware/authMiddleware.js'

router.post('/', statusController.createStatus)
//router.get('/', authMiddleware, statusController.getAllStatus)
router.get('/', statusController.getAllStatus)
router.get('/:id', statusController.getOneStatus)
router.put('/:id', statusController.updateStatus)
router.delete('/:id', statusController.deleteStatus)


module.exports = router