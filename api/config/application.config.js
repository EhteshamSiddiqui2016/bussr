module.exports = {

    db: {
        URL:
            'mongodb://' +
            process.env.MONGO_SERVER_HOST +
            ':' +
            process.env.MONGO_SERVER_PORT +
            '/' +
            process.env.MONGO_TICKET_DB_NAME

    }
};
