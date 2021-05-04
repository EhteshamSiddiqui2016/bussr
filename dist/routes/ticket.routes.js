"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const auth_1 = __importDefault(require("../middleware/authorization/auth"));
const ticketbooking_controller_1 = __importDefault(require("../controller/ticketbooking.controller"));
const ticketBookingRouter = express_1.Router();
ticketBookingRouter.post('/ticket', auth_1.default, ticketbooking_controller_1.default.bookTicket);
ticketBookingRouter.put('/ticket/:ticketId', auth_1.default, ticketbooking_controller_1.default.updateTicket);
ticketBookingRouter.delete('/ticket/:ticketId', auth_1.default, ticketbooking_controller_1.default.deleteTicket);
ticketBookingRouter.get('/ticket/:ticketId', auth_1.default, ticketbooking_controller_1.default.getTicketById);
ticketBookingRouter.post('/ticket/analytics/visited', auth_1.default, ticketbooking_controller_1.default.getAnalytics);
module.exports = ticketBookingRouter;
//# sourceMappingURL=ticket.routes.js.map