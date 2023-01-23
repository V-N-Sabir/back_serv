const Router = require('express')
const router = new Router()

const salesController = require('../controller/productController')

const authMiddleware = require('../middleware/authMiddleware')
// Вставить токен в заголовок
//router.get('/', authMiddleware,  salesController.getAllDocs)

//router.post('/', authMiddleware, salesController.createProduct) // 
router.post('/', salesController.createProduct) // 
// При переходе по страницам
router.get('/page', salesController.getAllProductPage) 
router.post('/search', salesController.searchProduct)
router.get('/',  salesController.getAllProduct)
router.get('/:id', salesController.getOneProduct)
router.put('/:id', salesController.updateProduct)
router.delete('/:id', salesController.deleteProduct)
 



module.exports = router