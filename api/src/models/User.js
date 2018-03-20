'use strict'

const { conn } = require('../core/Database')
const { Schema } = require('mongoose')

const schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: {type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

schema.pre('save', function(next){
    this.updatedAt = Date.now();
    next();
});

module.exports =  {
    schema: schema,
    model:  conn.model('User', schema)
};