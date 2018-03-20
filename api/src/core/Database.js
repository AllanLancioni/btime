'use strict'

const Mongoose = require('mongoose')

Mongoose.Promise = Promise

class Database {

    static get conn() {
        if (!Database._conn) {
            throw new Error('Database is not connected!')
        }
        return Database._conn
    }

    static set connectionString(params) {
        if (typeof params === 'string') {
            this._path = params;
        } else if (typeof params === 'object'){
            const required = ['drive', 'user', 'pwd', 'host', 'port', 'dbName'];
            required.forEach(param => {
                if (!params[param]) {
                    throw new Error(`Connection string with object have needs following params: ${required.join(', ')}. Missing ${param}`)
                }
            })
            this._path = `${params.drive}://${params.user}:${params.pwd}@${params.host}:${params.port}/${params.dbName}`
        } else {
            throw new Error(`Params have to be a string or an object.`)
        }
    }

    static get connectionString() {

        return process.env.MONGO_URI || Database._path || null;
    }

    static createConnection(params) {

        if (params) {
            Database.connectionString = params
        }

        return new Promise((resolve, reject) => {
            Mongoose.connect(Database.connectionString, {}, err => {
                if (err) {
                    reject(err)
                }
            }).then(() => {
                Database._conn = Mongoose.connection
                resolve(true)
            }).catch(err => {
                reject(err)
            })
        })
    }
}

module.exports = Database