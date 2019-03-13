var mysql = require('mysql');
const fs = require('fs');
exports.login = function (require,response,next) {
    console.log(Boolean(require.body['path']));
    if (String(require.body['path']) != 'null' && String(require.body['path']) != 'undefined'){
        fs.readFile(require.body['path'],function (err,data) {
            if (err) console.log(err);
            response.send(data);
        })
    }else {
        var poll = mysql.createPool({
            host:'localhost', //链接地址
            'port':'3306', //接口， 3306为默认接口
            'user':'root', //数据库用户名
            'password':'123456', //密码
            'database':'usertab', //库名
        })

        poll.getConnection(function (err,connection) {
            if(err){
                console.log('链接失败');
            }else {
                if (require.body["manage"]) {
                    connection.query("SELECT * FROM `manage` WHERE user = '" + require.body.user + "' AND password = '" + require.body.password + "';", function (err, data) {
                        if (err) {
                            console.log(err);
                        } else {
                            if (data.length > 0) {
                                response.send(data[0]);
                                connection.end(); //断开链接
                            } else {
                                response.send('登录失败');
                                connection.end(); //断开链接
                            }

                        }
                    })
                }else {
                    connection.query("SELECT * FROM `tenement` WHERE user = '" + require.body.user + "' AND password = '" + require.body.password + "';", function (err, data) {
                        if (err) {
                            console.log(err);
                        } else {
                            if (data.length > 0) {
                                response.send(data[0]);
                                connection.end(); //断开链接
                            } else {
                                response.send('登录失败');
                                connection.end(); //断开链接
                            }

                        }
                    })
                }
            }

        })
    }
}