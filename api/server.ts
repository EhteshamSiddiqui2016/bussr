import * as http from 'http'
import app from './app';

const PORT = normalizePort(process.env.PORT || '4005');

let server: http.Server;

server = http.createServer(app).listen(PORT, () => { });

console.log('BUSSR TICKET BOOKING SERVER listening on port ', PORT);

server.on('error', onError);

function normalizePort(val: string) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }
    return false;
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
        default:
            throw error;
    }
}
