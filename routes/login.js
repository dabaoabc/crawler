var express = require('express');
var router = express.Router();
var user = require('../model/user.js');  
var mongoose = require('mongoose');
var session = require('express-session');


router.get('/', function (req, res) {
    var that = this;
    res.render('login');  
});
router.post('/', function (req, res) {
    if (!req.body) return res.sendStatus(400);
    user.findOne({
      password: req.body.password,
      email: req.body.email
    },function(err, data){
      if (data) {
        req.session.username = data.user_name;
        req.session.email = data.email;
        res.redirect('/');
      }else{
        res.redirect('/login');
      }
    })
});
module.exports = router;