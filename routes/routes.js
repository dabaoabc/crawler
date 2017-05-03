var express = require('express');
var router = express.Router();
var main = require('./main');
var news = require('./news');
var sites = require('./sites');
var config = require('./config');
var login = require('./login');
var logout = require('./logout');
var noadmin = require('./noadmin');
var user_manage = require('./user_manage');
var hot_word = require('./hot_word');
var analysis = require('./analysis');


router.use('/', main);
router.use('/news', news);
router.use('/sites', sites);
router.use('/config', config);
router.use('/login', login);
router.use('/logout', logout);
router.use('/user_manage', user_manage);
router.use('/hot_word', hot_word);
router.use('/analysis', analysis);
router.use('/401', noadmin);


module.exports = router;