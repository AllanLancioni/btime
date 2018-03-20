"use strict"

const _ = require('lodash')
const DatabaseErrorHandler = require('./DatabaseErrorHandler.service')
const databaseErrorHandler = new DatabaseErrorHandler();

class ResponseHandler {


    constructor(response, successStatus = 200) {

        return new Promise( async (resolve, reject) => {

            try {
                response = await response

                if (Array.isArray(response)) {
                    if(_.isError(response[1]))
                        reject([response[0], databaseErrorHandler.getErrorMessage.apply(null, response)])
                    else {
                        resolve(response)
                    }
                }

                if (response === null) {
                    reject([422, {ok: false, code: 422, message: 'Entity not found!'}])
                }

                if (!response) {
                    response = {}
                }

                if (!response.meta && !response.data) {
                    response = { data: response, meta: {}}
                }

                if (_.isError(response.data)) {
                    reject(databaseErrorHandler.statusHandler(response.data));
                }
                response.data = this.clearResponseData(response.data)
                resolve([successStatus, response]);

            } catch (err) {
                reject(databaseErrorHandler.statusHandler(err))
            }
        })
    }

    clearResponseData(data) {

        if (!data) {
            return data
        }

        if (data.hasOwnProperty('_doc')) {
            data = data.toObject()
        }

        const clear = (item) => {

            if (item.hasOwnProperty('_doc')) {
                item = item.toObject()
            }

            item.id = item._id
            delete item._id
            delete item.__v
            delete item.deleted

            for (let prop in item) {

                if (!item[prop]) {
                    continue
                }

                if (item[prop]._id) {
                    clear(item[prop])
                }

                for (let subProp in item[prop]) {
                    if (item[prop][subProp] && item[prop][subProp]._id) {
                        clear(item[prop][subProp])
                    }
                }
            }
            return item;
        }
        return (data instanceof Array) ? data.map(item => clear(item)) : clear(data)
    }

    static async formatResponse(dataOrPromise) {
        try {
            const data = await dataOrPromise
            const meta = { total: data.length }
            return { data, meta }
        } catch(err) {
            return err;
        }

    }

}

module.exports = ResponseHandler