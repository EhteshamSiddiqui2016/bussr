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
const base_repository_1 = require("../base/base.repository");
const tickets_models_1 = __importDefault(require("../../models/tickets.models"));
class TicketRepository extends base_repository_1.BaseRepository {
    constructor() {
        super();
        this.getAnalyticsByAggregation = (startDate, endDate) => __awaiter(this, void 0, void 0, function* () {
            return tickets_models_1.default.aggregate([
                {
                    $match: {
                        creationDate: {
                            $gte: startDate,
                            $lte: endDate
                        }
                    }
                },
                {
                    $addFields: {
                        creationDate: { $dateToParts: { date: { $toDate: { $toLong: "$creationDate" } } } }
                    }
                },
                {
                    $group: {
                        _id: {
                            month: "$creationDate.month"
                        },
                        monthlyAmount: { $sum: { $toDouble: "$ticketPrice" } }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        month: "$_id.month",
                        monthlyAmount: 1,
                    }
                },
                {
                    $addFields: {
                        month: {
                            $let: {
                                vars: {
                                    monthsInString: [, 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                                },
                                in: {
                                    $arrayElemAt: ['$$monthsInString', '$month']
                                }
                            }
                        }
                    }
                }
            ]);
        });
    }
}
module.exports = new TicketRepository();
//# sourceMappingURL=ticket.repository.js.map