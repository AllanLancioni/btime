'use strict'

const Route = require('./Route');
const _ = require('lodash')

class RouteGroup extends Route {

    constructor(prefix = '', routes = [], defaultCtrl, middlewares = []) {

        try {
            super()
            this.prefix = prefix
            this.routes = routes
            this.defaultCtrl = defaultCtrl
            this.middlewares = middlewares
            this.subController = ''
            this.defaultCtrlName = ''

            if (typeof this.defaultCtrl === "string" && this.defaultCtrl.indexOf('.') > - 1) {
                const c = this.defaultCtrl.split('.')
                this.defaultCtrl = c.shift(0)
                this.subController = c.join('.') + '.'
            }

            if (typeof this.defaultCtrl === "string") {
                this.defaultCtrlName = this.defaultCtrl;
                this.defaultCtrl = super.getController(this.defaultCtrl)
            }

            return Promise.all(routes.map(async route => await this.setRoute(...route)))
                .then(() => this)
                .catch(err => err)

        } catch(err) {
            return err;
        }
    }

    async setRoute(httpVerb, url, functionOrControllerMethod, singleMiddlewares = []) {

        let controller = functionOrControllerMethod,
            controllerName

        if (typeof functionOrControllerMethod === "string") {
            const concatSingleRoute = `${(this.subController ? this.subController + '.' : '') + functionOrControllerMethod}`
            controllerName = `${this.defaultCtrlName}.${concatSingleRoute}`
            controller = _.get(this.defaultCtrl, concatSingleRoute)
        } else {
            controllerName = 'Anonymous function'
        }

        super.createRoute({
            httpVerb,
            path: this.prefix + url,
            middlewares: [...this.middlewares, ...singleMiddlewares],
            controller,
            controllerName
        })
    }
}

module.exports = RouteGroup