
var mysql = require('mysql');


exports.switchoverRentState = function (require,response,next) {
    var poll = mysql.createPool({
        host:'localhost', //链接地址
        'port':'3306', //接口， 3306为默认接口
        'user':'root', //数据库用户名
        'password':'123456', //密码
        'database':'house_rent', //库名
    })
    let sql = "update house set occupancy = "
    if (require.body.occupancy == '0'){
        sql += "'true'"
    } else {
        sql += "'false'"
    }
    sql += " WHERE id = '"+ require.body.houseId+ "'"
    poll.getConnection(function (err,connection) {
        if (err) console.log(err);
        else {
            connection.query(sql, function (err, data) {
                if (err) {
                    console.log(err);
                } else {
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
    })

}