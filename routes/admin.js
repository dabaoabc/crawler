var config = require('../conf.js');


var auth = function(req, res, next) {  
//鉴定用户  
//如果鉴定失败，则调用next(new Error('Not authorized'));  
var username = req.session.username;
var email = req.session.email;
if (username == config.admin.user && email == config.admin.email) {
	return next();
}else{
	res.redirect('/401');
}
//或者res.send(401);  
  
} 

module.exports = auth;
