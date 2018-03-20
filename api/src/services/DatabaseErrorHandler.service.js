class DatabaseErrorHandler {

    async statusHandler(err) {

        if (err === "NOT_FOUND" || err.message === "NOT_FOUND") {
            return [404, this.getErrorMessage(404)]
        }

        let statusCode = 500

        switch (err.name) {
            case "ValidationError":
            case "CastError":
                statusCode = 400
                //It isn't a validation/cast error to user. Let's considerate that this id doesn't exists at all.
                if (err.type === "ObjectId" && err.path === "_id") {
                    err = null
                    statusCode = 404
                }
                break
            case "MongoError":
                statusCode = err.code == '11000' ? 409 : 500
                break
        }

        return [statusCode, this.getErrorMessage(statusCode, err)]

    }

    getErrorMessage(errorStatus, err) {
        let msg;
        switch (errorStatus) {

            case 500: return "Server Internal Error"
            case 409:
                msg = 'Conflict or Duplicate'
                if (err.message) {
                    const field = err.message.substring(err.message.indexOf("index: ") + 7, err.message.search(/_\d dup key/))
                    return `${msg} - Field: ${field}`

                } else return msg
            case 404: return "Register not found"
            case 400:
                msg = "Data requested error!"
                if (err.message) {
                    return `${msg} ${err.message}`
                }
                return msg

        }

    }
}

module.exports = DatabaseErrorHandler