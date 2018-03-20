'use strict'

const jwt = require('jsonwebtoken');
const _ = require('lodash');
const { secret } = require('../enviroment')

class Auth {

    static isLoggedIn() {

        return new Promise((resolve, reject) => {
            const token = _.get(this, 'request.headers.authorization');

            if (!token) { reject() }

            jwt.verify(token, secret, (err, decode) => {
                if (err) {
                    reject([401, err.message.replace(/\w/, m => m.toUpperCase())])
                }
                this.state.user = decode.data
                resolve(decode)
            });
        })

    }
}

module.exports = Auth