const http = require('http');
const app = require('./app');

// const server = http.createServer((req, res) => {
//     console.log(app);
//     res.end('My first server...');
// })
// server.listen(process.env.port || 3000);


// http.createServer(app)


// IMPROVING SERVER.JS


const normalizePort = val => {
    const port = parseInt(val, 10);

    if(isNaN(port)){
        return val
    }
    if(port>=0){
        return port
    }
    else{
        return false
    }
};

const port = normalizePort(process.env.PORT || 3000);
app.set('port', port);

const errorHandler = error => {
    if(error.syscall !== 'listen'){
        throw error;
    }
    const address = server.address;
    const bind = typeof address === 'string' ? 'pipe '+ address : 'port '+ port;

    switch(error.code){
        case 'EACCES':
            console.log(bind + 'requires elevated priviledges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.log(bind + ' is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const server = http.createServer(app);
server.on('error', errorHandler);

server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port '+ port;
    console.log('listening on '+ bind);
});

server.listen(port);

