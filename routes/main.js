var express = require('express');
var router = express.Router();
var site_config = require('../model/site_config.js'); 
var mongoose = require('mongoose');

router.get('/', function(req, res, next) {
	// req.session.sessname = 'i am a sesion';
	// console.log(req.session.sessname);
	// console.log(res.locals.userInfo);
	var username = req.session.username;
	site_config.find({}, function(err, data){
    	res.render('index', {
			list: data,
	        wsport: PORTS[1],
	        item: "爬虫管理",
	        username: username,
	        wsport: PORTS[1]
		});
    });
	
});

module.exports = router;