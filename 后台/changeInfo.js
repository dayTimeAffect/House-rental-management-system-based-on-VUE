var mysql = require('mysql');
exports.changeInfo = function (require,response,next) {
    var poll = mysql.createPool({
        host:'localhost', //链接地址
        'port':'3306', //接口， 3306为默认接口
        'user':'root', //数据库用户名
        'password':'123456', //密码
        'database':'usertab', //库名
    })
    var sql = "update manage set name = '" + require.body.name + "',age = '" + require.body.age + "',sex = '" + require.body.sex + "',phone = '" + require.body.phone + "',email = '" + require.body.email + "' WHERE user = '" + require.body.user + "';"
    poll.getConnection(function (err,connection) {
        if(err){
            console.log('链接失败');
        }else {
            if (require.body["manage"]) {
                connection.query(sql, function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(data);
                        if (data.affectedRows > 0) {
                            response.send("修改成功");
                            connection.end(); //断开链接
                        } else {
                            response.send("修改失败");
                            connection.end(); //断开链接
                        }
                    }
                })
            }
        }
    })
}
