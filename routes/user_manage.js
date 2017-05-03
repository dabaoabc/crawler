var express = require('express');
var router = express.Router();
var user = require('../model/user.js'); 
var admin = require('./admin.js'); 
var mongoose = require('mongoose');


router.get('/', admin, function(req, res, next) {
  // req.session.sessname = 'i am a sesion';
  // console.log(req.session.sessname);
  // console.log(res.locals.userInfo);
  var username = req.session.username;
  var list = [];
  user.find({}, function(err, data){
      if (data) {
        data.forEach(function(e){
          list.push(e);
        });
        res.render('user_manage', {
          list: data,
          item: "用户管理",
          wsport: PORTS[1],
          username: username
        });
      }
    })
});

router.post('/', admin,function (req, res) {
    if (!req.body) return res.sendStatus(400);
    user.create({
      user_name: req.body.user_name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      qq: req.body.qq
    },function(err, data){
      if (err) {
        res.json({
          status: false,
          info: '邮箱已存在',
          data: err
        });
      }else{
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
    user.remove({
      email: req.body.email
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
});
module.exports = router;