const Router = require('express')
const router = new Router()

const BasketController = require('../controller/basketController')
//import BasketController from "../controller/basketController.js"

router.post('/', BasketController.createBasket)
router.get('/', BasketController.getAllBasket)
router.get('/:id', BasketController.getBasket)
router.put('/:id', BasketController.updateBasket)
router.delete('/:id', BasketController.deleteBasket)


module.exports = router