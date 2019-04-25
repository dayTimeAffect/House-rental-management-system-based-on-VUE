var exprss = require('express');
var mysql = require('mysql');
var bodyParse = require('body-parser');
var Multer = require('multer');
var server = exprss();
var login = require('./login') // 登录接口模块
var register = require('./register') // 注册接口模块
var examine = require('./examine') // 信息查阅接口模块
var Delete = require('./delete') // 信息删除接口模块
var release = require('./release') // 信息发布接口模块
var changeInfo = require('./changeInfo') // 个人信息修改接口模块
var bookHouse = require('./bookHouse') // 预订房屋接口
var switchoverRentState = require('./switchoverRentState') // 切换房屋状态接口
var rentMange = require('./rentMange') // 租赁管理接口
/*
* 监听接口
* */
server.listen(2173);

/*
* 跨域
* */
server.use('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

/*
* 处理请求数据
* */
// server.use(Multer.any()); //任何格式的文件都能接收
server.use(bodyParse.urlencoded({}));
server.use(bodyParse.json({}));
/*
* 登录
* */
server.post('/login',function (require,response,next) {
    login.login(require,response,next)
})

/*
* 注册
* */
server.post('/register',function (require,response,next) {
    register.register(require,response,next)
})

/*
* 查阅
* */
server.post('/examine',function (require,response,next) {
    examine.examine(require,response,next)
})

/*
* 删除
* */
server.post('/delete',function (require,response,next) {
    Delete.delete(require,response,next)
})

/*
* 信息发布
* */
server.post('/release',function (require,response,next) {
    release.release(require,response,next)
})

/*
* 个人信息修改
* */
server.post('/changeInfo',function (require,response,next) {
    changeInfo.changeInfo(require,response,next)
})

/*
*预订房屋
* */
server.post('/bookHouse',function (require,response,next) {
    bookHouse.bookHouse(require,response,next)
})

/*
* 修改房屋状态
* */
server.post('/switchoverRentState',function (require,response,next) {
    switchoverRentState.switchoverRentState(require,response,next)
})

/*
* 租赁管理
* */
server.post('/rentMange',function (require,response,next) {
    rentMange.rentMange(require,response,next)
})