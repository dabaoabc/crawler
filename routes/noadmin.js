var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  var username = req.session.username;
  res.render('401', {
  	item: "无权限",
	wsport: PORTS[1],
	username: username
  })
});

module.exports = router;