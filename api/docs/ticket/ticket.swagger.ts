export const TicketSwagger = {
    '/ticket': {
        post: {
            description: 'Create new ticket',
            summary: 'Create new ticket',
            requestBody: {
                description: 'New ticket to be created',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/Ticket'
                        }
                    }
                }
            },
            operationId: 'createNewTicket',
            responses: {
                '200': {
                    description: 'New ticket created successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Ticket created successfully'
                                    }
                                }
                            }
                        }
                    }
                }
            },
            security: [
                {
                    api_key: []
                }
            ]
        }
    },
    '/ticket/{ticketId}': {
        put: {
            description: 'Updates the ticket data',
            summary: 'Updates the ticket data',
            parameters: [

                {
                    in: 'path',
                    name: 'ticketId',
                    type: 'string',
                    required: true,
                    example: '608eb6015a71416e6c5a85fe',
                    description: 'Numeric ID of the Ticket to update.'
                }
            ],
            requestBody: {
                description: 'Updates the Ticket data',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                customerName: {
                                    required: true,
                                    type: 'string',
                                    example:
                                        'Siddiqui Sam'

                                },
                                performanceTitle: {
                                    type: 'string',
                                    example: 'Scintilating Performance - II'
                                },
                                ticketPrice: {
                                    type: 'string',
                                    example: '2021-05-03T00:11:22.333Z'
                                },
                                creationDate: {
                                    type: 'string',
                                    example: '2021-05-03T00:11:22.333Z'
                                },
                                performanceTime: {
                                    type: 'string',
                                    example: '10:11'
                                },
                            }
                        }
                    }
                }
            },
            operationId: 'updateTicket',
            responses: {
                '204': {},
                '404': {
                    description: 'No record updated for Ticket Id.'
                },
                default: {
                    description: 'Unexpected error'
                }
            },
            security: [
                {
                    api_key: []
                }
            ]
        },
        delete: {
            description: 'Delete the ticket data',
            summary: 'Delete the ticket data',
            parameters: [

                {
                    in: 'path',
                    name: 'ticketId',
                    type: 'string',
                    required: true,
                    example: '608eb6015a71416e6c5a85fe',
                    description: 'Numeric ID of the Ticket to update.'
                }
            ],

            operationId: 'deleteTicket',
            responses: {
                '404': {
                    description: 'No record deleted for Ticket Id.'
                },
                default: {
                    description: 'Unexpected error'
                }
            },
            security: [
                {
                    api_key: []
                }
            ]
        },
        get: {
            summary: 'Find a Ticket by ID',
            description: 'Returns a Ticket by ID',
            operationId: 'getTicketById',
            parameters: [
                {
                    name: 'ticketId',
                    in: 'path',
                    description: 'ID of Ticket to return',
                    required: true,
                    style: 'simple',
                    explode: false,
                    schema: {
                        type: 'string',
                        required: true,
                        description: 'Ticket Id to get the Ticket details',
                        example: '608eb6015a71416e6c5a85fe'
                    }
                }
            ],
            responses: {
                '200': {
                    description: 'Ticket details successfully fetched',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Ticket details successfully fetched'
                                    },
                                    data: {
                                        type: 'object',
                                        description: 'Response object from the server',
                                        properties: {
                                            result: {
                                                type: 'object',
                                                description: 'Brand profile object',
                                                properties: {
                                                    customerName: {
                                                        type: 'string',
                                                        example: 'Ehtesham Siddiqui'
                                                    },
                                                    performanceTitle: {
                                                        type: 'string',
                                                        example: 'Good Performance'
                                                    },
                                                    performanceTime: {
                                                        type: 'string',
                                                        example: '11:15'
                                                    },
                                                    ticketPrice: {
                                                        type: 'string',
                                                        example: '23.00'
                                                    },
                                                    creationDate: {
                                                        type: 'string',
                                                        example: '2021-05-02T00:11:22.333Z'
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                '404': {
                    description: 'Ticket Id 608eb6015a71416e6c5a85fe does not exists in the database'
                }
            },
            security: [
                {
                    api_key: []
                }
            ]
        }
    },
    '/ticket/analytics/visited': {
        post: {
            description: 'Get profit analytics by date',
            summary: 'Get profit analytics by date',
            requestBody: {
                description: 'Filters to get analytics',
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                methodType: { type: 'string', example: 'aggregation|nonaggregation' },
                                startDate: { type: 'string', example: '2021-05-02T00:11:22.333Z' },
                                endDate: { type: 'string', example: '2021-05-10T00:11:22.333Z' }
                            }
                        }
                    }
                }
            },
            operationId: 'getProfitAnalytics',
            responses: {
                '200': {
                    description: 'Profit analytics successfully fetched',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'Analytical data successfully fetched'
                                    },
                                    result: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                month: {
                                                    type: 'string',
                                                    example: 'Jan'
                                                },
                                                totalAmount: {
                                                    type: 'number',
                                                    example: '1200.00'
                                                }
                                            }
                                        }
                                    },
                                    totalProfit: { type: 'number', example: '5800' }
                                }
                            }
                        }
                    }
                }
            },
            security: [
                {
                    api_key: []
                }
            ]
        }

    }
};
