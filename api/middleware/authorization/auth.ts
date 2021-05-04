import { NextFunction, Request, Response } from 'express';
const { ApplicationError } = require('../../utils/error');
const authHeader = '7qrid9oucwjbrscp5irena842eaual'
export = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.headers && req.headers['authorization']) {
            if (req.headers['authorization'] != authHeader) {
                throw new ApplicationError(401, 'Authorization Token mismatched.');
            }
            next()
        } else {
            throw new ApplicationError(401, `Authorization Token not found.`);
        }
    } catch (error) {
        next(error);
    }
};
