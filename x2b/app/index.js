

const http = require ( 'http' );

const server = http.createServer ((req,res) => {

	let body = '';
	req.setEncoding ('utf8');
	
	req.on ( 'data', (chunk) => {
		body += chunk;
	});

	req.on ('end' , () => {
		try {
			console.log ('got request');
			const data = JSON.parse (body);
			res.write ( typeof data);
			res.end();
		} catch (err) {
			res.statusCode = 400;
			return res.end ( `error: ${err.message}` );
		}
	});
});

process.on ( 'SIGTERM', () => {
console.info('Exiting');
server.close();
});

server.listen (1337);
