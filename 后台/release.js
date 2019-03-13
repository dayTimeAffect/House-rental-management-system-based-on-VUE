var mysql = require('mysql');
const fs = require('fs');
var path = require('path');

exports.release = function (require,response,next) {
    // console.log(require.body);
    var pathExt = path.parse(require.files[0].originalname)
/*    console.log(pathExt);
    console.log(require.files);*/
/*    fs.mkdir('./house/11',function (err) {
        console.log(err);
    })
    fs.writeFile('./house/11/1.txt','1111',function (err) {
        if (err) console.log(err);
    })*/
    fs.rename(''+require.files[0].destination+require.files[0].filename,''+require.files[0].destination+require.files[0].filename+pathExt.ext,function (err) {
        if (err) console.log(err);
    })
    fs.readFile('D:\\毕业设计\\基于Web开发的房屋租赁管理系统\\后台\\house\\temporary\\92ce5e3a1b17d4fcc695748ed265a595.jpg',function (err,data) {
        if (err) console.log(err);
        response.send(data);
    })
    // response.sendFile('D:\\毕业设计\\基于Web开发的房屋租赁管理系统\\后台\\house\\temporary\\92ce5e3a1b17d4fcc695748ed265a595.jpg')
    // response.send(''+require.files[0].destination+require.files[0].filename+pathExt.ext)



/*    fs.writeFile('./house/1.jpg', require.files[0].buffer,function(err){  //写入文档
        if (err) console.log(err);
    })*/
/*        var poll = mysql.createPool({
            host:'localhost', //链接地址
            'port':'3306', //接口， 3306为默认接口
            'user':'root', //数据库用户名
            'password':'123456', //密码
            'database':'house_rent', //库名
        })

        poll.getConnection(function (err,connection) {
            if(err) console.log(err)
            else {
    /!*            fs.writeFile('文档名','文档内容'，function(err){  //写入文档
                })*!/
                response.send('发布成功')
                connection.end();
            }
        })*/
}