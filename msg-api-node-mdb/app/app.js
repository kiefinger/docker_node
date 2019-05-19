const database = require ( './persistence');
const server = require ( './server');

var EventEmitter = require ('events').EventEmitter;

async function startup () {
    console.log ('Starting app');

    try{
        console.log ( 'Initializeing database module');
        await database.initialize();
        
    } catch ( err ) {
        console.error ( "caught:" , err ) ;
        process.exit(1);
    }

    var emitter = new EventEmitter();

    emitter.on( 'error', function(message) {
        console.log( 'event handler: ', message);
    });

    try{
        console.log('Init web server modle ' );
        app =  await server.initialize();
	return app;

    } catch ( err) {
        console.error(err);
        process.exit(1);
    }
}

async function shutdown (e) {
    let err = e;

    try {
        console.log('Closing database module');
        await database.close();
    } catch ( ex ) {
        console.log('Encountered error', ex);
        err = err|e;
    }

    console.log('Shutting down web server');
    try {
        console.log('Closing web server module');
        await server.close();
    } catch ( ex ) {
        console.log('Encountered exception', ex);
        err = err|e;
    }
    console.log('Exiting process');
    if ( err) {
        process.exit(1);
    } else {
        process.exit(0);
    }
}

process.on('SIGTERM', () => {
    console.log('Received SIGTERM');
    shutdown();
});

process.on('SIGINT', () => {
    console.log('Received SIGINT');
    shutdown();
});

process.on ('uncaughtException', err => {
    console.log('Uncaught exception');
    console.error(err);
    console.log( err.stack)
    shutdown(err);
})

module.exports.startup = startup;
module.exports.shutdown = shutdown;
