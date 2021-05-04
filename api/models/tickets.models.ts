const mongoose = require('mongoose');
const TicketSchema = mongoose.Schema(
    {
        creationDate: { type: Date },
        customerName: { type: String },
        performanceTitle: { type: String },
        performanceTime: { type: String },
        ticketPrice: {
            type: mongoose.Decimal128,
            set: (ticketPrice: any) =>
                mongoose.Types.Decimal128.fromString(parseFloat(ticketPrice).toFixed(2)),
            get: (ticketPrice: any) => {
                if (ticketPrice) {
                    return ticketPrice.toString();
                } else {
                    return null;
                }
            }
        }

    },
    {
        collection: 'tickets',
        timestamps: {
            createdAt: true,
            updatedAt: true
        }
    }
);
TicketSchema.set('toObject', { getters: true });
TicketSchema.set('toJSON', { getters: true });

export = mongoose.model('Ticket', TicketSchema);
