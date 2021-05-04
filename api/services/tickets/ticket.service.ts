import TicketRepository from '../../repositories/ticket/ticket.repository'
import TicketModel from '../../models/tickets.models'
const _ = require('lodash');
class TicketService {

    constructor() { }

    public bookTicket = async (ticketBooking: any): Promise<any> => {
        try {
            return await TicketRepository.create(
                TicketModel, ticketBooking
            );
        } catch (error) {
            throw error;
        }
    }

    public updateTicketById = async (ticketId: string, updateTicketBooking: any): Promise<any> => {
        try {
            return await TicketRepository.update(TicketModel, ticketId, updateTicketBooking);
        } catch (error) {
            throw error;
        }
    }
    public deleteTicketById = async (ticketId: string): Promise<any> => {
        try {
            return await TicketRepository.deleteOneById(TicketModel, ticketId);
        } catch (error) {
            throw error;
        }
    }

    public getTicketById = async (ticketId: string): Promise<any> => {
        try {
            return await TicketRepository.findById(
                TicketModel,
                ticketId,
                '-__v -updatedAt -createdAt'
            );
        } catch (error) {
            throw error;
        }
    };

    public getDetailedAnalytics = async (methodType: string, startDate: any, endDate: any): Promise<any> => {
        try {
            let analyticsData: any = [], totalProfit = 0;
            if (methodType == 'aggregation') {
                analyticsData = await TicketRepository.getAnalyticsByAggregation(startDate, endDate);
            } else {
                analyticsData = await TicketRepository.findByQuery(TicketModel, {
                    creationDate: {
                        $gte: startDate,
                        $lte: endDate
                    }
                }, "-__v -_id -createdAt -updatedAt");



                let arrAnalytics = analyticsData.map(function (item) {
                    return {
                        ticketPrice: item.ticketPrice.toString(),
                        customerName: item.customerName,
                        performanceTitle: item.performanceTitle,
                        performanceTime: item.performanceTime,
                        creationDate: item.creationDate

                    };
                });

                const monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                ];


                var groupedByMonth = _.groupBy(arrAnalytics, function (item) {
                    return monthNames[new Date(item.creationDate).getMonth()];
                });

                analyticsData = [];
                for (var month in groupedByMonth) {
                    let check = groupedByMonth[month].map(item => item.ticketPrice.toString()).reduce((prev, next) => parseFloat(prev) + parseFloat(next), 0);
                    analyticsData.push({ month: month, monthlyAmount: parseFloat(check) })
                }
            }

            totalProfit = analyticsData.map(item => item.monthlyAmount.toString()).reduce((prev, next) => prev + next);
            return { analyticsData, totalProfit };
        } catch (error) {
            throw error;
        }
    };
}

export = new TicketService()