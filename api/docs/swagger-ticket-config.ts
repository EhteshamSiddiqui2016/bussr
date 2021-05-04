
import { TicketSwagger } from './ticket/ticket.swagger';

export const swaggerTicketDocument = {
    openapi: '3.0.1',
    info: {
        version: '1.0.0',
        title: 'BUSSR TICKET APIs Document',
        description: 'TICKET API Endpoint'
    },
    components: {
        schemas: {
            Ticket: {
                type: 'object',
                properties: {
                    customerName: {
                        type: 'string',
                        example: 'Siddiqui. M. Ehtesham'
                    },
                    performanceTitle: {
                        type: 'string',
                        example: 'Scintilating Performance'
                    },
                    ticketPrice: {
                        type: 'string',
                        example: '2021-05-02T00:11:22.333Z'
                    },
                    creationDate: {
                        type: 'string',
                        example: '2021-05-02T00:11:22.333Z'
                    },
                    performanceTime: {
                        type: 'string',
                        example: '10:11'
                    },
                }
            }
        },
        securitySchemes: {
            api_key: {
                type: 'apiKey',
                name: 'Authorization',
                in: 'header'
            }
        }
    },
    security: {},
    paths: Object.assign(
        TicketSwagger
    )
};
