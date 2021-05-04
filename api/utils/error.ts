class ApplicationError extends Error {
    statusCode: any;
    constructor(statusCode: number, message: string) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}
const handleError = (err: any, res: any) => {
    let { statusCode, message } = err;
    if (!statusCode) {
        statusCode = 500;
    }
    res.status(statusCode).json({
        message
    });
};
module.exports = {
    ApplicationError,
    handleError
};
