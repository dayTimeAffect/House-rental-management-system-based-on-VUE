var exprss = require('express');
var mysql = require('mysql');
var bodyParse = require('body-parser');
var Multer = require('multer')();

var server = exprss();
server.listen(2174);
server.use('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});
server.use(Multer.any()); //任何格式的文件都能接收
server.post('/release',function (require,response,next) {
    console.log(require.files);
    // release.release(require,response,next)
})