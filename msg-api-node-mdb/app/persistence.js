
const dbConfig = require('./config/persistence.js');

let connection;
var dbo;
var db_g;

function getDb() {
	return db_g.db("test");
}
async function initialize() {
	console.log('Connecting to database');
	
	var MongoClient = require('mongodb').MongoClient;
	//var url = `mongodb://${dbConfig.DB_HOST}:${dbConfig.DB_PORT}/${dbConfig.DB_DATABASE}`;
	var url = `mongodb://${dbConfig.DB_HOST}:${dbConfig.DB_PORT}/${dbConfig.DB_DATABASE}`;

	MongoClient.connect(url, { useNewUrlParser: true },	 function(err, db) {
		  if (err) {
			  console.log ("ERROR: There is an error");
			  throw err;
		  }
		  console.log("Database created!");
		  console.log ( db );
		  db_g = db;
		  dbo = db;
		  console.log ( dbo );
	});

    console.log(`Connected to ${url}`);
}

async function close() {
	  db_g.close();
	
}
module.exports.initialize = initialize;
module.exports.close = close;
module.exports.dbo = dbo;
module.exports.getDb = getDb;
