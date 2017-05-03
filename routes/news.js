var express = require('express');
var router = express.Router();
var article = require('../model/article.js');
var hot_word = require('../model/hot_word.js');
var bayesian = require('../lib/bayesian.js');
var moment = require('moment');
var mongoose = require('mongoose');
var nodejieba = require("nodejieba");
var segmentword = [];

Array.prototype.unique = function() {
    this.sort(); //先排序
    var res = [this[0]];
    for (var i = 1; i < this.length; i++) {
        if (this[i] !== res[res.length - 1]) {
            res.push(this[i]);
        }
    }
    return res;
}
router.get('/:site', function(req, res) {
    var site = req.params.site;
    var that = this;
    var list_new = [];
    var site_name = [];
    var username = req.session.username;

    article.find({
        site_name: site
    }, function(err, result) {
        if (result) {
            result.forEach(function(e) {
                    site_name.push(e.site_name);
                    list_new.push({
                        title: e.title,
                        c_time: moment(e.c_time).format('L'),
                        _id: e._id,
                        category: e.category
                    });
                })
                // console.log(site_name.unique());
            res.render('new_list', {
                list_new: list_new,
                item: "内容列表",
                username: username
            });
        }
    })
});

router.get('/site/:id', function(req, res) {
    var _id = mongoose.Types.ObjectId(req.params.id);
    var username = req.session.username;
    var that = this;
    var list = [];

    article.findOne({ _id: _id }, function(err, result) {
        if (result) {
            segmentword = [];
            var string = result.content;
            resultArray = nodejieba.extract(string, 5);
            resultArray.forEach(function(e) {
                segmentword.push(e.word);
            });
            hot_word.find({}, function(err, data) {
                if (data) {
                    data.forEach(function(e) {
                        list.push(e);
                    });
                    var suggestcategory =  bayesian(segmentword,list)
                    res.render('article_content', {
                        content: result,
                        suggestcategory: suggestcategory,
                        list: list,
                        item: "文章详情",
                        username: username
                    });
                }
            })

        }
    })
});

router.post('/category', function(req, res){
    var id = mongoose.Types.ObjectId(req.body._id);
    var email = req.session.email;
    var category = req.body.category;
    article.update({
        _id: id
    },{
        category: category,
        marked_person: email
    },function(err, result){
        if (result.ok) {
            res.json({
              status: true,
              info: "提交成功",
              data: result
            });
        }else{
            res.json({
              status: true,
              info: "未找到",
              data: result
            });
        }
    });

    hot_word.update({
        hot_word: category
    }, {
        $pushAll:{
            segmentword: segmentword
        }
    }, function(err, result){
        if (err) {
            console.log("err",err);
        }
    })
})



module.exports = router;
