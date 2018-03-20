'use strict'

const router = require('koa-router')()
const { compose } = require('../Process')

class Route {

    get version() {
        return ''
    }

    static get koaRouter() {
        return router
    }

    async createRoute(params) {

        const possibleHttpVerb = ['get', 'post', 'put', 'patch', 'delete', 'options', 'header'];
        const httpVerb = possibleHttpVerb.find(x => x === (params.httpVerb || '').toLowerCase())
        if (!httpVerb) {
            throw new Error(
                `You must to pass a httpVerb in param!
                Values allowed: ${possibleHttpVerb.map(x => `"${x.toUpperCase()}"`).join(' | ')}`
            )
        }

        Route.koaRouter[params.httpVerb.toLowerCase()](
            ( this.version || '') + params.path,
            await compose( params.middlewares, params.controller, params.controllerName )
        )
    }

    getController(ctrlName) {
        return require(`../../controllers/${ctrlName}.controller`)
    }

}

module.exports = Route;