const { Type } = require('../Models/models')
const ApiError = require('../error/ApiError')

class TypeController {
    async create(req, res) {
        const { name } = req.body
        const type = await Type.create({ name })
        return res.json(type)
    }
    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types)
    }

    async delete(req, res) {
        const { id } = req.params
        const type = await Type.destroy(
            {
                where: { id },
            },
        )
        return res.json(type)
    }

    async updateName(req, res, next) {
        try {
            const { id } = req.params
            const { name } = req.body
            const updatedName = await Type.update(
                { name },
                { where: { id } }
            )
            return res.json(updatedName)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new TypeController()