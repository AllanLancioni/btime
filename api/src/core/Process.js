'use strict'

class Process {

    static setMiddleware( middlewares, ctx ) {

        return new Promise( async (resolve, reject ) => {

            if (middlewares.length === 0) {
                return resolve()
            }

            for (let mw of middlewares) {
                try {
                    await mw.call( ctx, ctx.request, ctx.response )
                } catch (err) {
                    return reject(err)
                }
                resolve()
            }
        })
    }

    static async compose( middlewares = [], controller, controllerName ) {

        try {

            return async ( ctx, next ) => {
                let response;

                try {
                    response = await Process.setMiddleware( middlewares, ctx )

                    try {
                        if (typeof controller !== 'function') {
                            controller = await controller
                        }
                        response = await controller.call( ctx, ctx.request, ctx.response ) || {}

                    } catch ( controllerErr ){
                        if (!response && !(controllerErr instanceof Array)) {
                            response = [500, 'Server Internal Error!']
                            console.error((!controller) ? `ERROR! Cannot resolve controller or call "${controllerName}" as a function on url "${ctx.url}"` : controllerErr)
                        } else {
                            response = controllerErr
                        }
                    }

                } catch (err) {
                    response = err || [401, 'Forbidden']
                }

                if (response instanceof Array) {
                    response = {
                        status: response[0],
                        body: response[1]
                    }
                }
                if( response.status >= 400 && response.status < 600 ) {
                    if (typeof response.body === 'string') {
                        response.body = {
                            status: 'Error',
                            code: response.status,
                            message: response.body
                        }
                    }
                }

                ctx.status = response.status || 202
                ctx.body = response.body || (response.status ? "No response for this request" : '')

                if (/[4-5]\d\d/g.test( response.toString())) {
                    ctx.throw( response.status, response.body)
                }

                await next()
            }

        } catch (err) {
            console.error(`Can not compose controller "${controllerName}" -  ${err}`)
            console.error(err)
        }

    }

}

module.exports = Process;