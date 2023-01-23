const Router = require('express')
const router = new Router()

const PageHeadController = require('../controller/pheadController')

//import authMiddleware from '../middleware/authMiddleware.js'
//router.get('/', authMiddleware,  KontrController.createKontragent)

router.post('/', PageHeadController.createPageHead)
router.get('/', PageHeadController.getAllPageHeads)
router.post('/search', PageHeadController.searchPageHead)
router.get('/:id', PageHeadController.getOnePageHead)
router.put('/:id', PageHeadController.updatePageHead)
router.delete('/:id', PageHeadController.deletePageHead)


module.exports = router