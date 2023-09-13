const Router = require('express')
const router = new Router()
const typeController = require('../Controllers/typeController')
const checkRole = require('../Middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), typeController.create) // создание 
router.get('/', typeController.getAll)   // получение
router.delete('/:id', checkRole('ADMIN'), typeController.delete) // создание 
router.put('/:id/name', checkRole('ADMIN'), typeController.updateName)


module.exports = router