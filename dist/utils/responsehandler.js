"use strict";
class responseHandler {
    constructor() {
        this.okResponse = (response, result) => {
            if (result) {
                response.status(200).json(result);
            }
            else {
                response.status(204).send();
            }
        };
        this.createdResponse = (response, result) => {
            if (result) {
                response.status(201).json(result);
            }
            else {
                response.status(204).send();
            }
        };
        this.redirectionResponse = (response, statusCode) => {
            response.status(statusCode).send();
        };
        this.validationErrors = (response, validationErrors) => {
            response.status(400).send(validationErrors);
        };
    }
}
module.exports = new responseHandler();
//# sourceMappingURL=responsehandler.js.map