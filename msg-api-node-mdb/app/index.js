const app  = require ( './app');


async function startup () {
    
    try{
	await app.startup();
        
    } catch ( err ) {
        console.error ( "caught:" , err ) ;
        process.exit(1);
    }

}


startup();
