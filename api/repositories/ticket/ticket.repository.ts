import { BaseRepository } from '../base/base.repository';
import TicketsModel from '../../models/tickets.models'
class TicketRepository extends BaseRepository {
    constructor() {
        super();
    }
    public getAnalyticsByAggregation = async (startDate: any, endDate: any): Promise<any> => {
        return TicketsModel.aggregate([
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
    }
}

export = new TicketRepository();
