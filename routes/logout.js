var express = require('express');
var router = express.Router();
var user = require('../model/user.js');  
var mongoose = require('mongoose');
var session = require('express-session');


router.get('/', function (req, res) { 
    req.session.username = null;
    req.session.email = null;
    return res.redirect("/login");
});
module.exports = router;