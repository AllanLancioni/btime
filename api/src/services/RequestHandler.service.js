'use strict'

const _ = require('lodash')

class RequestHandler {

    static validateRequired(arr, reqBody, finalMessage = "in payload") {
        if (!Array.isArray(arr)) {
            arr = [arr]
        }
        const missing = arr.filter(field => !(_.has(reqBody, field)))
        return (missing.length > 0) ? [400, `Missing required fields: "${missing.join('", "')}" ${finalMessage}!`] : null;

    }

}

module.exports = RequestHandler