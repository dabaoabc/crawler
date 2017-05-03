/*
* @author junmo
 */
var mongoose = require('mongoose')

var UserSchema = mongoose.Schema({
    user_name: {type: String},
    email: {type: String, unique: true},
    password: {type: String},
    phone: {type: String},
    qq: {type: String}
});

var User = mongoose.model('newusers', UserSchema)
module.exports = User;