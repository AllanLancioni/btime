'use strict'

const { SingleRoute, RouteGroup } = require('./core/router')
const { isLoggedIn } = require('./middlewares/Auth.middleware')

module.exports = () => [

    new SingleRoute('GET', '/', () => [200, 'App works!']),

    new SingleRoute('GET', '/private', () => [200, 'You are logged in!'], [isLoggedIn]),

    new SingleRoute('POST', '/login', 'User.login'),
    new SingleRoute('POST', '/register', 'User.create'),

    // new SingleRoute('POST', '/auth', '', [isLoggedIn]),
    // new SingleRoute('POST', '/create-account', () => [200, 'You are logged in!'], [isLoggedIn]),

    new RouteGroup('/products', [
        ['GET', '/', 'findAll'],
        ['GET', '/:id', 'findById'],
        ['POST', '/', 'create'],
        ['PUT', '/:id', 'update'],
        ['DELETE', '/:id', 'delete'],
    ], 'Product', [isLoggedIn])

]