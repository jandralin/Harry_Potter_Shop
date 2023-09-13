const sequelize = require('../db')
const { DataTypes } = require('sequelize') // импорт типов полей

// модель пользователя
const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
})

// модель корзины пользователя
const Basket = sequelize.define('basket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

// модель корзины c товарами
const BasketProduct = sequelize.define('basket_product',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    }
)

// модель товара
const Product = sequelize.define('product',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, unique: true, allowNull: false },
        price: { type: DataTypes.INTEGER, allowNull: false },
        img: { type: DataTypes.STRING, allowNull: false },
    }
)

// модель типа
const Type = sequelize.define('type',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, unique: true, allowNull: false },
    }
)


// модель информации о товаре
const ProductInfo = sequelize.define('product_info',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        title: { type: DataTypes.STRING, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: false },
    }
)

// связи
User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketProduct)
BasketProduct.belongsTo(Basket)

Type.hasMany(Product)
Product.belongsTo(Type)

Product.hasMany(BasketProduct)
BasketProduct.belongsTo(Product)

Product.hasMany(ProductInfo, { as: 'info' });
ProductInfo.belongsTo(Product)

module.exports = {
    User,
    Basket,
    BasketProduct,
    Product,
    Type,
    ProductInfo
}
