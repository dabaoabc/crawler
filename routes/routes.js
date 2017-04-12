var express = require('express');
var router = express.Router();
var main = require('./main');
var news = require('./news');
var config = require('./config');


router.use('/', main);
router.use('/news', news);
router.use('/config', config);


module.exports = router;