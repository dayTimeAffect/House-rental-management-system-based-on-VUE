var mysql = require('mysql');
exports.superQuery = function (require,response,next) {
    var poll = mysql.createPool({
        host: 'localhost', //链接地址
        'port': '3306', //接口， 3306为默认接口
        'user': 'root', //数据库用户名
        'password': '123456', //密码
        'database': 'house_rent', //库名
    })
    poll.getConnection(function (err,connection) {
        if (require.body.step == '1') {
            let sql = "SELECT * FROM `house` WHERE linkman_user = '" + require.body.user + "';"
            connection.query(sql,function (err, data) {
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
        else if (require.body.step == '2'){
            let sql = "SELECT * FROM `bookhouse` WHERE renter_user = '" + require.body.user + "';"
            connection.query(sql,function (err, data) {
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
    })
}