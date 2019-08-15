var mysql = require('mysql');
exports.delete = function (require,response,next) {
    var poll = mysql.createPool({
        host:'localhost', //链接地址
        'port':'3306', //接口， 3306为默认接口
        'user':'root', //数据库用户名
        'password':'123456', //密码
        'database':'house_rent', //库名
    })

    poll.getConnection(function (err,connection) {
        if(err) console.log(err)
        else {
            if (require.body.length > 0) {
                require.body.forEach(function (val,index,arr) {
                    connection.query("DELETE FROM `house` WHERE id = '"+val.id+"'", function (err, data) {
                        if (err) {
                            console.log(err);
                            response.send("撤销失败")
                        } else {
                            console.log(data);
                        }
                    })
                })
            }
            response.send('撤销成功')
            connection.end();
        }
    })
}