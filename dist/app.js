"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const express_1 = __importDefault(require("express"));
const ticket_routes_1 = __importDefault(require("./routes/ticket.routes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const http_errors_1 = __importDefault(require("http-errors"));
const swagger_ticket_config_1 = require("./docs/swagger-ticket-config");
const { handleError } = require('./utils/error');
const CONFIG = require('../api/config/application.config');
class App {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
        this.cors();
        this.mongoSetup();
        this.errorHandler();
    }
    routes() {
        this.app.use('/swagger', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_ticket_config_1.swaggerTicketDocument, { explorer: true }));
        this.app.use('/', ticket_routes_1.default);
        this.app.get('/', (req, res) => {
            res.send("Service running successfully @v1.0.0!!!");
        });
    }
    config() {
        this.app.use(express_1.default.json({ limit: '100mb' }));
    }
    cors() {
        this.app.use(function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization,Location,Access-Control-Allow-Origin');
            res.header('Access-Control-Request-Headers', 'Content-Type, Authorization,Location,Access-Control-Allow-Origin');
            res.header('Access-Control-Allow-Credentials', true);
            return next();
        });
    }
    mongoSetup() {
        mongoose.Promise = global.Promise;
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useFindAndModify', false);
        mongoose.set('useCreateIndex', true);
        mongoose.set('useUnifiedTopology', true);
        mongoose
            .connect(CONFIG.db.URL)
            .then(() => {
            console.log('Successfully connected to the database', CONFIG.db.URL);
        })
            .catch((err) => {
            console.error('Could not connect to the database. Exiting now...', err);
            process.exit();
        });
    }
    errorHandler() {
        // catch 404 and forward to error handler
        this.app.use(function (req, res, next) {
            next(http_errors_1.default(404));
        });
        // error handler
        this.app.use(function (err, req, res, next) {
            res.locals.message = err.message;
            res.locals.error = err;
            handleError(err, res);
        });
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map