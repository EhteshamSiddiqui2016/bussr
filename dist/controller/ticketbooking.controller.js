"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const responsehandler_1 = __importDefault(require("../utils/responsehandler"));
const ticket_service_1 = __importDefault(require("../services/tickets/ticket.service"));
const mongoose = require('mongoose');
const { ApplicationError } = require('../utils/error');
class TicketBookingController {
    constructor() {
        this.bookTicket = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                let response;
                response = yield ticket_service_1.default.bookTicket(req.body);
                if (!response) {
                    throw new ApplicationError(500, `Unknown Error on Ticket Booking`);
                }
                responsehandler_1.default.createdResponse(res, { message: `New Ticket record inserted for Customer : ${response.customerName}` });
            }
            catch (error) {
                next(error);
            }
        });
        this.updateTicket = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield ticket_service_1.default.updateTicketById(req.params.ticketId, req.body);
                if (!response) {
                    throw new ApplicationError(404, `No record updated for Ticket Id ${req.params.ticketId}`);
                }
                responsehandler_1.default.okResponse(res);
            }
            catch (error) {
                next(error);
            }
        });
        this.deleteTicket = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield ticket_service_1.default.deleteTicketById(mongoose.Types.ObjectId(req.params.ticketId));
                if (response.deletedCount == 0) {
                    throw new ApplicationError(404, `No record deleted for Ticket Id ${req.params.ticketId}`);
                }
                responsehandler_1.default.okResponse(res, `Record deleted for TicketId: ${response.id}`);
            }
            catch (error) {
                next(error);
            }
        });
        this.getTicketById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield ticket_service_1.default.getTicketById(req.params.ticketId);
                if (!response) {
                    throw new ApplicationError(404, `Ticket Id ${req.params.ticketId} does not exists in the database`);
                }
                responsehandler_1.default.okResponse(res, {
                    message: `Ticket details successfully fetched`,
                    data: { result: response }
                });
            }
            catch (error) {
                next(error);
            }
        });
        this.getAnalytics = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield ticket_service_1.default.getDetailedAnalytics(req.body.methodType, new Date(req.body.startDate), new Date(req.body.endDate));
                if (!response) {
                    throw new ApplicationError(404, `Ticket Id ${req.params.ticketId} does not exists in the database`);
                }
                responsehandler_1.default.okResponse(res, {
                    message: `Analytical data successfully fetched`,
                    result: response.analyticsData,
                    totalProfit: response.totalProfit
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
module.exports = new TicketBookingController();
//# sourceMappingURL=ticketbooking.controller.js.map