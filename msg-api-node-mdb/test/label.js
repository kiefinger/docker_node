let chai = require ( 'chai');
let chaiHttp = require ('chai-http');
let should = chai.should();
let app = require ('../app/app');
let Label = require('../app/model/label.model');
var EventEmitter = require ('events').EventEmitter;

async function setup () {
   express_app = await app.startup();
}

chai.use ( chaiHttp );
var emitter = new EventEmitter();
emitter.on( 'error', function(message) {
     console.log( 'event handler: ', message);
});

describe ( 'Labels' , () => {

	before ( function () {
          setup();
	});
	after ( function() {
	  app.shutdown();
	});

	describe ( '/GET labels' , () => {
	    it (' it should get all labels' , (done) => {
		chai.request (express_app)
			.get('/labels/mdb')
			.end ((err,res) => {
				res.should.have.status(200);
				res.body.should.be.a ('array');
				//res.body.length.should.be.eql(0);
				done();
			});
		});
	});
	describe ( '/POST labels' , () => {
	    it (' it should post a book' , (done) => {
		let label = {
			applCode: "mdb",
			labelKey: "four",
			labelLocale: "en_EN",
			labelValue: "Test"
			
		}
		chai.request ( express_app)
			.post ('/labels')
			.send (label)
			.end((err,res) => {
				res.should.have.status(201);
				res.body.should.be.a('object');
				res.body.should.have.property('applCode');
			done();
			});
		});
	});
	describe ( '/PUT labels' , () => {
	    it (' it should update a book' , (done) => {
		let label = {
			applCode: "mdb",
			labelKey: "four",
			labelLocale: "en_EN",
			labelValue: "Update"
		}
		chai.request ( express_app)
			.put ('/labels')
			.send (label)
			.end((err,res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('applCode');
				res.body.should.have.property('labelValue');
			done();
			});
		});
	});
	describe ( '/GET  a label' , () => {
	    it (' it should get a label' , (done) => {
		chai.request (express_app)
			.get('/labels')
			.query ( { applCode: 'mdb',labelKey: 'four',labelLocale: 'en_EN' })
			.end ((err,res) => {
				res.should.have.status(200);
				res.body.should.have.property('labelValue');
				done();
			});
		});
	});
	describe ( '/DELETE labels' , () => {
	    it (' it should delete a book' , (done) => {
		let label = {
			applCode: "mdb",
			labelKey: "four",
			labelLocale: "en_EN",
		}
		chai.request ( express_app)
			.delete ('/labels')
			.query ( { applCode: 'mdb',labelKey: 'four',labelLocale: 'en_EN' })
			.send (label)
			.end((err,res) => {
				res.should.have.status(200);
			done();
			});
		});
	});
});
