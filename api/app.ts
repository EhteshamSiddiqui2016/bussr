import mongoose = require('mongoose');
import express from 'express';
import ticketRouter from './routes/ticket.routes';
import swaggerUi from 'swagger-ui-express';
import createError from 'http-errors';
import { swaggerTicketDocument } from './docs/swagger-ticket-config';

const { handleError } = require('./utils/error');
const CONFIG = require('../api/config/application.config');
class App {
    public app: express.Application;
    constructor() {
        this.app = express();
        this.config();
        this.routes();
        this.cors();
        this.mongoSetup();
        this.errorHandler();
    }

    private routes(): void {
        this.app.use(
            '/swagger',
            swaggerUi.serve,
            swaggerUi.setup(swaggerTicketDocument, { explorer: true })
        );
        this.app.use(
            '/',
            ticketRouter
        );
        this.app.get('/', (req, res) => {
            res.send("Service running successfully @v1.0.0!!!");
        });

    }
    private config(): void {
        this.app.use(express.json({ limit: '100mb' }));
    }

    private cors(): void {
        this.app.use(function (req: any, res: any, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
            res.header(
                'Access-Control-Allow-Headers',
                'Content-Type, Authorization,Location,Access-Control-Allow-Origin'
            );
            res.header(
                'Access-Control-Request-Headers',
                'Content-Type, Authorization,Location,Access-Control-Allow-Origin'
            );
            res.header('Access-Control-Allow-Credentials', true);
            return next();
        });
    }


    private mongoSetup(): void {
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
            .catch((err: any) => {
                console.error('Could not connect to the database. Exiting now...', err);
                process.exit();
            });
    }

    private errorHandler(): void {
        // catch 404 and forward to error handler
        this.app.use(function (req: any, res: any, next) {
            next(createError(404));
        });

        // error handler
        this.app.use(function (err: any, req: any, res: any, next) {
            res.locals.message = err.message;
            res.locals.error = err;
            handleError(err, res);
        });
    }
}
export default new App().app;
