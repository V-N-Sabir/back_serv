

const Router = require('express')
const router = new Router()

const RowsController = require('../controller/rowsSalesController')


router.post('/', RowsController.createRows)
router.get('/', RowsController.getAllRowses)
router.get('/:id', RowsController.getRows)
router.put('/:id', RowsController.updateRows)
router.delete('/:id', RowsController.deleteRow)


module.exports = router