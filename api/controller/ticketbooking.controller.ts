import { Request, Response, NextFunction } from 'express';
import responseHandler from '../utils/responsehandler';
import TicketService from '../services/tickets/ticket.service'
const mongoose = require('mongoose');
const { ApplicationError } = require('../utils/error');

class TicketBookingController {
    constructor() { }

    public bookTicket = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {

            let response: any;
            response = await TicketService.bookTicket(req.body)

            if (!response) {
                throw new ApplicationError(500, `Unknown Error on Ticket Booking`);
            }
            responseHandler.createdResponse(res, { message: `New Ticket record inserted for Customer : ${response.customerName}` });

        } catch (error) {
            next(error);
        }
    };
    public updateTicket = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            let response = await TicketService.updateTicketById(
                req.params.ticketId,
                req.body);

            if (!response) {
                throw new ApplicationError(
                    404,
                    `No record updated for Ticket Id ${req.params.ticketId}`
                );
            }
            responseHandler.okResponse(res);
        } catch (error) {
            next(error);
        }
    };

    public deleteTicket = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            let response = await TicketService.deleteTicketById(mongoose.Types.ObjectId(req.params.ticketId));
            if (response.deletedCount == 0) {
                throw new ApplicationError(
                    404,
                    `No record deleted for Ticket Id ${req.params.ticketId}`
                );
            }
            responseHandler.okResponse(res, `Record deleted for TicketId: ${response.id}`);
        } catch (error) {
            next(error);
        }
    };

    public getTicketById = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            let response = await TicketService.getTicketById(req.params.ticketId);
            if (!response) {
                throw new ApplicationError(
                    404,
                    `Ticket Id ${req.params.ticketId} does not exists in the database`
                );
            }
            responseHandler.okResponse(res, {
                message: `Ticket details successfully fetched`,
                data: { result: response }
            });
        } catch (error) {
            next(error);
        }
    };

    public getAnalytics = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        try {
            let response = await TicketService.getDetailedAnalytics(req.body.methodType, new Date(req.body.startDate), new Date(req.body.endDate));
            if (!response) {
                throw new ApplicationError(
                    404,
                    `Ticket Id ${req.params.ticketId} does not exists in the database`
                );
            }
            responseHandler.okResponse(res, {
                message: `Analytical data successfully fetched`,
                result: response.analyticsData,
                totalProfit: response.totalProfit

            });
        } catch (error) {
            next(error);
        }
    };

}

export = new TicketBookingController()