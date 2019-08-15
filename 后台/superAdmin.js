var mysql = require('mysql');
exports.superAdmin = function (require,response,next) {
    var poll = mysql.createPool({
        host:'localhost', //链接地址
        'port':'3306', //接口， 3306为默认接口
        'user':'root', //数据库用户名
        'password':'123456', //密码
        'database':'usertab', //库名
    })
    poll.getConnection(function (err,connection) {
        if (err) console.log(err);
        else {
            if (require.body.step == '1') {
                let sql = "SELECT * FROM `superAdmin` WHERE superAdminUser = '" + require.body.user + "' AND superAdminPassword = '" + require.body.password + "';"
                connection.query(sql,function (err, data) {
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
            else if (require.body.step == '2'){
                let data1 = [{
                    landlord:[],
                    lessee:[],
                }];
                let sql1 = "SELECT * FROM `manage`"
                connection.query(sql1,function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        data1[0].landlord = data
                        let sql2 = "SELECT * FROM `tenement`"
                        connection.query(sql2,function (err, data) {
                            if (err) {
                                console.log(err);
                            } else {
                                data1[0].lessee = data
                                response.send(data1);
                                connection.end(); //断开链接
                            }
                        })
                    }
                })

            }


        }
    })
}