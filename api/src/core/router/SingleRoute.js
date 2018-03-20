'use strict'

const Route = require('./Route');
const router = require('koa-router')()

class SingleRoute extends Route {

    static async create(...args) {
        return await (new SingleRoute(...args))
    }

    constructor(httpVerb, path, controllerOrControllerName, middlewares = []) {

        super()

        return new Promise(async (resolve, reject) => {
            try {

                let controllerName = 'Anonymous function';

                let controller = (typeof controllerOrControllerName === "string") ? (() => {
                    controllerName = controllerOrControllerName;
                    let pieces = controllerOrControllerName.split('.');
                    return super.getController(pieces[0])[pieces[1]]
                })() : controllerOrControllerName;

                await this.createRoute({httpVerb, path, middlewares, controller, controllerName})

                resolve(this)
            } catch (err) {
                reject(err)
            }
        })
    }

}

module.exports = SingleRoute;