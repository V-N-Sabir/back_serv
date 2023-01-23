const Router = require('express')
const router = new Router()

const PageController = require('../controller/pageController')


//import authMiddleware from '../middleware/authMiddleware.js'
//router.get('/', authMiddleware,  KontrController.createKontragent)

router.post('/', PageController.createPage)
router.get('/', PageController.getAllPages)
router.post('/search', PageController.searchPage)
router.get('/:id', PageController.getOnePage)
router.put('/:id', PageController.updatePage)
router.delete('/:id', PageController.deletePage)


module.exports = router