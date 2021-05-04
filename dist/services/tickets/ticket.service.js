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
const ticket_repository_1 = __importDefault(require("../../repositories/ticket/ticket.repository"));
const tickets_models_1 = __importDefault(require("../../models/tickets.models"));
const _ = require('lodash');
class TicketService {
    constructor() {
        this.bookTicket = (ticketBooking) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ticket_repository_1.default.create(tickets_models_1.default, ticketBooking);
            }
            catch (error) {
                throw error;
            }
        });
        this.updateTicketById = (ticketId, updateTicketBooking) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ticket_repository_1.default.update(tickets_models_1.default, ticketId, updateTicketBooking);
            }
            catch (error) {
                throw error;
            }
        });
        this.deleteTicketById = (ticketId) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ticket_repository_1.default.deleteOneById(tickets_models_1.default, ticketId);
            }
            catch (error) {
                throw error;
            }
        });
        this.getTicketById = (ticketId) => __awaiter(this, void 0, void 0, function* () {
            try {
                return yield ticket_repository_1.default.findById(tickets_models_1.default, ticketId, '-__v -updatedAt -createdAt');
            }
            catch (error) {
                throw error;
            }
        });
        this.getDetailedAnalytics = (methodType, startDate, endDate) => __awaiter(this, void 0, void 0, function* () {
            try {
                let analyticsData = [], totalProfit = 0;
                if (methodType == 'aggregation') {
                    analyticsData = yield ticket_repository_1.default.getAnalyticsByAggregation(startDate, endDate);
                }
                else {
                    //let selectProperty = { customerName: 1, ticketPrice: { $toString: "$ticketPrice" } }
                    analyticsData = yield ticket_repository_1.default.findByQuery(tickets_models_1.default, {
                        creationDate: {
                            $gte: startDate,
                            $lte: endDate
                        }
                    }, "-__v -_id -createdAt -updatedAt");
                }
                if (analyticsData.length > 0 && methodType == "nonaggregation") {
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
                    //if (groupedByMonth.length > 0) {
                    analyticsData = [];
                    let finalArry = [];
                    for (var months in groupedByMonth) {
                        let check = groupedByMonth[months].map(item => item.ticketPrice.toString()).reduce((prev, next) => parseFloat(prev) + parseFloat(next), 0);
                        finalArry.push({ month: months, monthlyAmount: parseFloat(check) });
                        console.log(finalArry);
                    }
                    let groupedArray = Object.keys(groupedByMonth);
                    for (let i = 0; i <= groupedArray.length; i++) {
                        console.log(months);
                    }
                    // for (let index = 0; index <= groupedByMonth.length; index++) {
                    //     analyticsData.push()
                    //     totalProfit = groupedByMonth[index].map(item => item.ticketPrice).reduce((prev, next) => prev + next);
                    // }
                    // }
                    //  totalProfit = analyticsData.map(item => item.monthlyAmount.toString()).reduce((prev, next) => prev + next);
                }
                return { analyticsData, totalProfit };
            }
            catch (error) {
                throw error;
            }
        });
    }
}
module.exports = new TicketService();
//# sourceMappingURL=ticket.service.js.map