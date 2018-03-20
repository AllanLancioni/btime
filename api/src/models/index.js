'use strict'

const User = require('./User')
const Product = require('./Product')

const imports = {
    User,
    Product
}

const models = {}
const schemas = {}

for (let name in imports) {
    models[name] = imports[name].model
    schemas[name] = imports[name].schema
}

module.exports = {
    imports,
    models,
    schemas
};