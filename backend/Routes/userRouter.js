const Router = require('express')
const router = new Router()
const userController = require('../Controllers/userController')
const authMiddleware = require('..//Middleware/authMiddleware')

router.post('/registration', userController.registration) // регистрация
router.post('/login', userController.login)  // авторизация
router.get('/auth', authMiddleware, userController.check) // авторизован или нет

module.exports = router