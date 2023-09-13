const uuid = require('uuid')
const path = require('path');
const { Product, ProductInfo } = require('../Models/models')
const ApiError = require('../error/ApiError');

class ProductController {
    async create(req, res, next) {
        try {
            let { name, price, typeId, info } = req.body
            const { img } = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const product = await Product.create({ name, price, typeId, img: fileName });
            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    ProductInfo.create({
                        title: i.title,
                        description: i.description,
                        productId: product.id
                    })
                )
            }
            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res) {
        try {
            let { typeId, limit, page } = req.query
            page = page || 1

            limit = limit || 10

            let offset = page * limit - limit
            let products;
            if (!typeId) {
                products = await Product.findAndCountAll({ limit, offset })
            }
            if (typeId) {
                products = await Product.findAndCountAll({ where: { typeId }, limit, offset })
            }
            return res.json(products)
        } catch (e) {
            console.log(e)
        }
    }

    async getOne(req, res) {
        const { id } = req.params
        const product = await Product.findOne(
            {
                where: { id },
                include: [{ model: ProductInfo, as: 'info' }]
            },
        )
        return res.json(product)
    }

    async delete(req, res) {
        const { id } = req.params

        let productId = id
        const prodInfo = await ProductInfo.destroy(
            {
                where: { productId },
            },
        )

        const product = await Product.destroy(
            {
                where: { id },
                include: [{ model: ProductInfo, as: 'info' }]
            },
        )

        return res.json(product)
    }


    async updateName(req, res, next) {
        try {
            const { id } = req.params
            const { name } = req.body
            const updatedName = await Product.update(
                { name },
                { where: { id } }
            )
            return res.json(updatedName)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async updatePrice(req, res, next) {
        try {
            const { id } = req.params
            const { price } = req.body
            const updatedPrice = await Product.update(
                { price },
                { where: { id } }
            )
            return res.json(updatedPrice)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async updateType(req, res, next) {
        try {
            const { id } = req.params
            const { typeId } = req.body
            const updatedType = await Product.update(
                { typeId },
                { where: { id } }
            )
            return res.json(updatedType)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    // Изменить описание
    async updateInfo(req, res, next) {
        try {
            const { id } = req.params
            const { description } = req.body

            const updateInfo = await ProductInfo.update(
                { description },
                { where: { id } }
            )
            return res.json(updateInfo)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async createInfo(req, res, next) {
        try {
            const { productId } = req.params
            let { title, description } = req.body
            const product = await ProductInfo.create({ title, description, productId });
            return res.json(product)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async updateImg(req, res, next) {
        try {
            const { id } = req.params
            const { img } = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const updatedImg = await Product.update(
                { img: fileName },
                { where: { id } }
            )
            return res.json(updatedImg)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }


}

module.exports = new ProductController()