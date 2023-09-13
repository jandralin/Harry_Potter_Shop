const Router = require('express')
const router = new Router()

const basketController = require('../Controllers/basketController')

const authMiddleware = require('../Middleware/authMiddleware')

//CRUD корзины
router.get('/', authMiddleware, basketController.getBasketUser)
router.post('/', authMiddleware, basketController.addToBasket)
router.delete('/:id', authMiddleware, basketController.deleteBasket)

module.exports = router