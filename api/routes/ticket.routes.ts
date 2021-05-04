import { Router } from 'express';
import authentication from '../middleware/authorization/auth';
import ticketBookingController from '../controller/ticketbooking.controller'

const ticketBookingRouter = Router();

ticketBookingRouter.post(
    '/ticket',
    authentication,
    ticketBookingController.bookTicket

);

ticketBookingRouter.put(
    '/ticket/:ticketId',
    authentication,
    ticketBookingController.updateTicket
);

ticketBookingRouter.delete(
    '/ticket/:ticketId',
    authentication,
    ticketBookingController.deleteTicket
);

ticketBookingRouter.get(
    '/ticket/:ticketId',
    authentication,
    ticketBookingController.getTicketById
);

ticketBookingRouter.post(
    '/ticket/analytics/visited',
    authentication,
    ticketBookingController.getAnalytics
);


export = ticketBookingRouter;