var express = require('express');
var hot_word = require('../model/hot_word.js');
var nodejieba = require("nodejieba");
var article = require('../model/article.js');
var router = express.Router();
var mongoose = require('mongoose');

var analysis = [];
router.get('/', function(req, res, next) {
    var username = req.session.username;
    var list = [];
    hot_word.find({}, function(err, data) {
        if (data) {
            data.forEach(function(e) {
                list.push(e);
            });
            res.render('analysis', {
                item: "数据分析",
                list: list,
                username: username
            })
        }
    })
});

router.post('/word', function(req, res, next) {
    var category = req.body.category;
    hot_word.findOne({
        hot_word: category
    }, function(err, result){
        if (err) {
            res.json({
                list: [],
                info: 'fail'
            });
        }
        res.json({
            list: result.segmentword,
            info: 'success'
        });
    });
    // article.find({
    //     category: category
    // }, function(err, result) {
    //     console.log('result',result);
    //     var resultArray;
    //     var list = [];
    //     if (result) {
    //         result.forEach(function(e) {
    //             var string = e.content;
    //             resultArray = nodejieba.extract(string, 5);
    //             resultArray.forEach(function(e) {
    //                 list.push(e.word);
    //             });
    //         });
    //         res.json({
    //             list: list,
    //             info: 'success'
    //         });
    //     }else{
    //         res.json({
    //             list: list,
    //             info: 'fail'
    //         });
    //     }
    // })
});

module.exports = router;
