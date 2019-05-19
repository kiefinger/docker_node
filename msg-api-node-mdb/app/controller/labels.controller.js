const database = require ( '../persistence');
const Label = require('../model/label.model');
const express = require('express');
const errorhandler = require ('./errors.controller');


exports.initialize = function initialize()  {
	const router = express.Router();

	router.post('/', create);
	router.get('/:applCode', getByApplCode);
	router.get('/', getById);
	router.put('/', update);
	router.delete('/', remove);
	return router;
}

const query = (req, response) => {
	console.log("->query: " + req.query.applCode, typeof req.query.applCode);
	if ( typeof req.query.applCode !== "undefined" ){
		return getById(req,response);
	}
	
    database.getDb().collection("lables").find().toArray(function(err, result) {
        if (err) throw err;
        //console.log(result);
        response.setHeader('Content-Type', 'application/json');
        response.end(JSON.stringify( result));
    	});
}

const getById = (req, res) => {
    let query;
    console.log( `label: ${req.query.applCode},${req.query.labelKey},${req.query.labelLocale}`);
	if ( typeof req.query.applCode === "undefined" ){
        	return errorhandler.returnBadRequestError(res, new Error("parameter applCode missing"));
	}
	if ( typeof req.query.labelKey === "undefined" ){
        	return errorhandler.returnBadRequestError(res, new Error("parameter labelKey missing"));
	}
	if ( typeof req.query.labelLocale === "undefined" ){
        	return errorhandler.returnBadRequestError(res, new Error("parameter labelLocale missing"));
	}
	try {
       query = new Label(req.query.applCode, req.query.labelLocale, req.query.labelKey);
    }
    catch (err) {
        return errorhandler.returnBadRequestError(res, err);
    }
    database.getDb().collection("lables").findOne(query, function(err, result) {
        if (err) throw err;
	if (result==null) {
        	return errorhandler.returnNotFoundError (res, new Error("not found"));
	}
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify( result));
    });
}

const getByApplCode = (req, res) => {
    console.log("REST request getByApplCode");
    var query = JSON.parse ( `{ "applCode":  "${req.params.applCode}" }`);
    database.getDb().collection("lables").find(query).toArray(function(err, result) {
        if (err) throw err;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify( result));
    });
}


const create = (req, response) => {
	console.log("->create");
    let label;
    try {
        label = new Label(req.body.applCode, req.body.labelLocale, req.body.labelKey, req.body.labelValue);
    }
    catch (err) {
        return ErrorController.returnBadRequestError(res, err);
    }
    database.getDb().collection("lables").insertOne(label, function(err, result) {
        if (err) throw err;
        console.log("1 document inserted");
        response.setHeader('Content-Type', 'application/json');
        response.status(201).send(JSON.stringify( label));
    	});
}

const update = (req, response) => {
	console.log("->udpate");
    let label;
    let query;
    try {
        label = new Label(req.body.applCode, req.body.labelLocale, req.body.labelKey, req.body.labelValue);
        query = new Label(req.body.applCode, req.body.labelLocale, req.body.labelKey);
        console.log(query);
    }
    catch (err) {
        return ErrorController.returnBadRequestError(res, err);
    }
    database.getDb().collection("lables").update(query, label, function(err, result) {
        if (err) throw err;
        console.log("1 document updated");
        //console.log(result);
        response.status(200).send(label);
    	});
}

const remove = (req, response) => {
	console.log("->delete");
    var query = JSON.parse(`{ "applCode": "${req.query.applCode}" , "labelkey": "${req.query.labelkey}" , "labelLocale": "${req.query.labelLocale}" 
}`);

    database.getDb().collection("lables").deleteMany(query, function(err, result) {
        if (err) throw err;
        //console.log(result);
        response.status(200).end();
    	});
}


