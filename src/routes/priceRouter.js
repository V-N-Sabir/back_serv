const Router = require('express')
const router = new Router()

const PriceController = require('../controller/priceController')

//const authMiddleware = require('../middleware/authMiddleware')
// Вставить токен в заголовок



router.post('/', PriceController.createPrice)
//router.get('/', authMiddleware,  userController.getAllDocs)
router.get('/', PriceController.getAllPrice)
router.post('/search', PriceController.searchProduct)
router.get('/:id', PriceController.getOnePrice)
router.put('/:id', PriceController.updatePrice)
router.delete('/:id', PriceController.deletePrice)
 



module.exports = router