require('dotenv').config()
const express = require('express') // импорт модуля
const sequelize = require('./db') // импорт бд
const models = require('./Models/models') // импорт модели
const cors = require('cors') // запросы с браузера
const fileUpload = require('express-fileupload') // пакет с файлами
const router = require('./Routes/index') // импорт роутеров
const errorHandler = require('./Middleware/ErrorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT // порт


const app = express() // запуск
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'Static')))
app.use(fileUpload({}))
app.use('/api', router)

// обработка ошибок 
app.use(errorHandler)


// функция для подключения к бд
const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()