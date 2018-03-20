'use strict'

const jwt = require('jsonwebtoken')
const _ = require('lodash')
const { secret } = require('../enviroment')
const { User } = require('../models').models
const Response = require('../services/ResponseHandler.service');
const { validateRequired } = require('../services/RequestHandler.service');
const format = Response.formatResponse

class UserController {

    static async login(req) {

        const missing = validateRequired(['email', 'password'], req.body)
        if (missing) {
            return missing
        }
        const user = await User.findOne(_.pick(req.body, ['email', 'password'])).lean()

        if (!user) {
            return [400, 'Invalid email or password!']
        }
        const token = jwt.sign({data:user}, secret, {
            expiresIn: 60 * 30 // seconds - 30 minutes
        });
        return new Response({..._.omit(user, 'password'), token})
    }

    static async findAll(req) {

        return new Response(format(User.find({})), 201)
    }

    static async create(req) {

        const missing = validateRequired(['name', 'email', 'password'], req.body)
        if (missing) {
            return missing
        }
        return new Response(format(User.create(req.body)), 201)
    }

}

module.exports = UserController