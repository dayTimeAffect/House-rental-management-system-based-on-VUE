var mysql = require('mysql');
exports.remove = function (require,response,next) {

    if (require.body.num == 1 || require.body.num == 2) {
        var poll = mysql.createPool({
            host: 'localhost', //链接地址
            'port': '3306', //接口， 3306为默认接口
            'user': 'root', //数据库用户名
            'password': '123456', //密码
            'database': 'usertab', //库名
        })
    } else {
        var poll = mysql.createPool({
            host: 'localhost', //链接地址
            'port': '3306', //接口， 3306为默认接口
            'user': 'root', //数据库用户名
            'password': '123456', //密码
            'database': 'house_rent', //库名
        })
    }
    poll.getConnection(function (err,connection) {
        if (err) console.log(err);
        else {
            let sql;
            if (require.body.num == 1) sql = "DELETE FROM `manage` WHERE id = '"+require.body.info.id+"'"
            else if (require.body.num == 2)  sql = "DELETE FROM `tenement` WHERE id = '"+require.body.info.id+"'"
            else if (require.body.num == 3)  sql = "DELETE FROM `bookhouse` WHERE `key` = '"+require.body.info.key+"'"
            else if (require.body.num == 4)  sql = "DELETE FROM `house` WHERE id = '"+require.body.info.id+"'"

            connection.query(sql, function (err, data) {
                if (err) {
                    console.log(err);
                    response.send("撤销失败")
                } else {
                    response.send('删除成功')
                    connection.end();
                }
            })
        }
    })
}