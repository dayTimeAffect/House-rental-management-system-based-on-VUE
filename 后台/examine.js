var mysql = require('mysql');
exports.examine = function (require,response,next) {
    console.log(require.body);
    var poll = mysql.createPool({
        host:'localhost', //链接地址
        'port':'3306', //接口， 3306为默认接口
        'user':'root', //数据库用户名
        'password':'123456', //密码
        'database':'house_rent', //库名
    })

    poll.getConnection(function (err,connection) {
        if(err){
            console.log('链接失败');
        }else {
            if (require.body["manage"]) {
                if (!Boolean(require.body.rentType)){
                    connection.query("SELECT * FROM `house` WHERE linkman_user = '" + require.body.user + "' AND linkman_name = '" + require.body.name + "';", function (err, data) {
                        if (err) {
                            console.log(err);
                        } else {
                            if (data.length > 0) {
                                response.send(data);
                                connection.end(); //断开链接
                            } else {
                                response.send('暂无数据');
                                connection.end(); //断开链接
                            }

                        }
                    })
                } else {
                    connection.query("SELECT * FROM `house` WHERE linkman_user = '" + require.body.user + "' AND linkman_name = '" + require.body.name + "' AND rentType like '%" + require.body.rentType + "%';", function (err, data) {
                        if (err) {
                            console.log(err);
                        } else {
                            if (data.length > 0) {
                                response.send(data);
                                connection.end(); //断开链接
                            } else {
                                response.send('暂无数据');
                                connection.end(); //断开链接
                            }

                        }
                    })
                }

            }else {
                connection.query("SELECT * FROM `house`", function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        if (data.length > 0) {
                            response.send(data);
                            connection.end(); //断开链接
                        } else {
                            response.send('暂无数据');
                            connection.end(); //断开链接
                        }

                    }
                })
            }
        }
    })

}