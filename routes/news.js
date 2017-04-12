var express = require('express');
var router = express.Router();
var filelist = require(ROOT + 'lib/file-list.js');
var article = require('../model/article.js'); 
var moment = require('moment');
var mongoose = require('mongoose');


router.get('/', function (req, res) {
    var configsName = filelist(ROOT + 'config');
    var that = this;
    var list_new = [];
    article.find({}, function(err, result){
    	if (result) {
    		result.forEach(function(e){
    			list_new.push({
    				title: e.title,
    				c_time: moment(e.c_time).format('L'),
    				_id: e._id
    			});
    		})
    		res.render('new_list', {
	            item: "新闻标注",
	            list_new: list_new
	        });
    	}
    })
    
});
router.get('/:id', function (req, res) {
    var configsName = filelist(ROOT + 'config');
    var _id = mongoose.Types.ObjectId(req.params.id);
    var that = this;
    article.findOne({_id: _id}, function(err, result){
    	if (result) {
    		res.render('article_content', {
                item: "新闻标注",
	            content: result
	        });
    	}
    })
    
});

module.exports = router;