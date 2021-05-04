import { Response, response } from 'express';

class responseHandler {
    constructor() { }
    okResponse = (response: Response, result?: Object) => {
        if (result) {
            response.status(200).json(result);
        } else {
            response.status(204).send();
        }
    };

    createdResponse = (response: Response, result?: Object) => {
        if (result) {
            response.status(201).json(result);
        } else {
            response.status(204).send();
        }
    };

    redirectionResponse = (response: Response, statusCode: number) => {
        response.status(statusCode).send();
    };

    validationErrors = (response: Response, validationErrors: Object) => {
        response.status(400).send(validationErrors);
    };
}

export = new responseHandler();
