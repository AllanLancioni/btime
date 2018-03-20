'use strict'

const { Product } = require('../models').models
const Response = require('../services/ResponseHandler.service');
const { validateRequired } = require('../services/RequestHandler.service');
const format = Response.formatResponse
const _ = require('lodash')

class ProductController {

    static async findAll(req) {
        return new Response(format(Product.find({})), 201)
    }

    static async findById(req) {

        const productPromise = Product
            .findById(this.params.id)
            .populate({path: 'owner', select: 'name email _id'})

        return new Response(productPromise, 201)
    }

    static async update(req) {

        const params = ['title', 'description', 'price'];
        const updateParams = _.pick(req.body, params);

        params.forEach(x => {
            if (!updateParams[x]) {
                delete updateParams[x]
            }
        })

        if (_.isEmpty(updateParams)) {
            return [400, 'Product\'s update is allowed for title, description, price. Please, inform at least one of these.']
        }

        const productPromise = Product.findByIdAndUpdate(
            this.params.id,
            { $set: updateParams },
            { new: true}
        )

        return new Response(productPromise, 200)
    }

    static async delete(req) {

        return new Response(Product.findByIdAndRemove(this.params.id), 204)
    }

    static async create(req) {

        const missing = validateRequired(['title', 'description', 'price'], req.body)
        if (missing) {
            return missing
        }
        const product = { ...req.body, owner: this.state.user._id }
        return new Response(format(Product.create(product)), 201)
    }

}

module.exports = ProductController