const Router = require('express')
const router = new Router()
const productController = require('../Controllers/productController')
const checkRole = require("../Middleware/checkRoleMiddleware");

router.post('/', checkRole('ADMIN'), productController.create) // создание 
router.post('/:productId/info', checkRole('ADMIN'), productController.createInfo) // создание info

router.get('/', productController.getAll)    // получение 
router.get('/:id', productController.getOne) // получение отдельного товара
router.delete('/:id', checkRole('ADMIN'), productController.delete) // удаление отдельного товара

// изменение
router.put('/:id/name', checkRole('ADMIN'), productController.updateName) 
router.put('/:id/type', checkRole('ADMIN'), productController.updateType)
router.put('/:id/price', checkRole('ADMIN'), productController.updatePrice)
router.put('/:id/img', checkRole('ADMIN'), productController.updateImg)
router.put('/:id/info', checkRole('ADMIN'), productController.updateInfo)

module.exports = router