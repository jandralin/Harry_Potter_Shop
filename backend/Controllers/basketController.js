const { Product, BasketProduct } = require("../Models/models")

class BasketController {

    async addToBasket(req, res) {
        const user = req.user
        const { productId } = req.body
        const basket = await BasketProduct.create({ basketId: user.id, productId: productId })
        return res.json(basket)
    }

    async getBasketUser(req, res) {
        const { id } = req.user
        const basket = await BasketProduct.findAll({
            include: {
                model: Product
            }, where: { basketId: id }
        })

        return res.json(basket)
    }

    async deleteBasket(req, res) {
        const { id } = req.params
        const basket = await BasketProduct.destroy({ where: { id } })
        return res.json(basket)
    }

}

module.exports = new BasketController()