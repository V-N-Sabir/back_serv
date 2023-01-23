const Router = require('express')
const router = new Router()

const userController = require('../controller/docController')

//import userController from "../controller/docController.js"

// Вставить токен в заголовок
//import authMiddleware from '../middleware/authMiddleware.js'


router.post('/', userController.createDoc)
//router.get('/', authMiddleware,  userController.getAllDocs)
router.get('/', userController.getAllDocs)
router.get('/:id', userController.getAllDocsUserId)
router.get('/filter/:id', userController.getAllDocsFilterId)
router.get('/:id', userController.getOneDoc)
router.put('/:id', userController.updateDoc)
router.delete('/:id', userController.deleteDoc)
 



module.exports = router
