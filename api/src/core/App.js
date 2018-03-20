'use strict'

const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const Router = require('./router/Route')
const cors = require('koa2-cors')

class App {

    static get koa() {
        if (!App._koa) {
            App._koa = new Koa()
        }
        return App._koa
    }

    static get server() {
        return App._server || null;
    }

    static set server(server) {
        App._server = server;
    }

    static set port(port) {
        App._port = port
    }

    static get port() {
        return App._port || process.env.PORT
    }

    static get CORSOptions() {
        return cors({
            origin: '*',
            allowMethods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
            credentials: true
        })
    }

    static use(...args) {
        App.koa.use(...args)
    }

    static init(port) {
        if (port) {
            App.port = port
        }
        App.use(App.CORSOptions)
        App.use(bodyParser())
        App.use(Router.koaRouter.routes())
        App.server = App.koa.listen(App.port)
    }

    static exit() {
        if (!App.server) {
            throw new Error(`Can't exit server since it has not been initialized.`)
        }
        App.server.close()
    }
}

module.exports = App