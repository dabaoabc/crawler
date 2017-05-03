var express = require('express');
var router = express.Router();
var hot_word = require('../model/hot_word.js');
var article = require('../model/article.js');
var admin = require('./admin.js');
var mongoose = require('mongoose');


router.get('/', admin, function(req, res, next) {
    // req.session.sessname = 'i am a sesion';
    // console.log(req.session.sessname);
    // console.log(res.locals.userInfo);
    var username = req.session.username;
    var list = [];
    hot_word.find({}, function(err, data) {
        if (data) {
            data.forEach(function(e) {
                list.push(e);
            });
            res.render('hot_word', {
                list: data,
                item: "热点词管理",
                username: username
            });
        }
    })
});

router.post('/', admin, function(req, res) {
    if (!req.body) return res.sendStatus(400);
    hot_word.create({
        hot_word: req.body.hot_word,
        segmentword: []
    }, function(err, data) {
        if (err) {
            res.json({
                status: false,
                info: '添加失败',
                data: err
            });

        } else {
            res.json({
                status: true,
                info: '添加成功',
                data: data
            });
        }
    })
});

router.post('/delete',admin, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    hot_word.remove({
      hot_word: req.body.hot_word
    },function(err, data){
      if (err) {
        res.json({
          status: false,
          info: '删除失败',
          data: err
        });
      }else{
        res.json({
          status: true,
          info: '删除成功',
          data: data
        });
      }
    })
    article.update({
        category: req.body.hot_word
    },{
        $set:{
            category: 'none'
        }  
    },{
        multi: true
    }, function(err, data){
        console.log(data);
    });
});
module.exports = router;
