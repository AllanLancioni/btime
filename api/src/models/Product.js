'use strict'

const { conn } = require('../core/Database')
const { Schema } = require('mongoose')

const schema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    imageNumber: { type: Number, default: () => Math.floor(Math.random() * 1084)},
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

schema.pre('save', function(next){
    this.updatedAt = Date.now();
    next();
});

module.exports =  {
    schema: schema,
    model: conn.model('Product', schema)
};