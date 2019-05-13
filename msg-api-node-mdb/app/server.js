const http = require ('http');
const express = require ( 'express');
const morgan = require ('morgan');
const bodyParser = require('body-parser');
const router = require ( './router');
const web_config = require ( './config/server');

let httpServer;

function initialize() {
    return new Promise ((resolve, reject) => {
        const app = express();
        httpServer = http.createServer(app);
        app.use (morgan ('combined'));
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        
    	router.initialize(app);

        httpServer.listen (web_config.port)
        .on ('listening', () => {
            console.log(`Web Server listening on localhost: ${web_config.port}`);
            resolve();
        })
        .on('error', err => {
            reject(err);
        });
    });
}

/**
 * The close function returns a promise that is resolved when the web
 * server is successfully closed. The httpServer.close method stops
 * new connections from being established, but it will not force 
 * already opened connections closed. Depending on how many connections
 * are open and what they are doing, you might have to wait a bit for 
 * the callback to fire. Though you will not do it in this module, 
 * it is possible to use custom code or npm modules, such as http-shutdown, 
 * to force open connections closed.
 */
function close() {
    return new Promise ( (resolve, reject) => {
        httpServer.close( (err) => {
            if ( err ) {
                reject ( err);
                return;
            }
            resolve();
        });
    });
}

module.exports.initialize = initialize;
module.exports.close = close;