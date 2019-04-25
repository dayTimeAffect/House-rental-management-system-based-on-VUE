var mysql = require('mysql');
exports.bookHouse = function (require,response,next) {
    var poll = mysql.createPool({
        host:'localhost', //链接地址
        'port':'3306', //接口， 3306为默认接口
        'user':'root', //数据库用户名
        'password':'123456', //密码
        'database':'house_rent', //库名
    })

    poll.getConnection(function (err,connection) {
        if (err) console.log(err);
        else {
            connection.query("SELECT * FROM `bookHouse` WHERE houseId = '"+require.body.houseId+"' AND linkman_user = '"+require.body.linkman_user+"' AND renter_user = '" +require.body.renter_user+"'",function (err,data) {
                if (err) console.log(err);
                else {
                    if (data.length>0){
                        response.send('已预订，请勿重复预订')
                        connection.end(); //断开链接
                    } else {
                        let sql = "INSERT INTO `bookHouse` (`houseId`, `linkman_user`, `renter_user`, `renter_name`, `renter_phone`, `renter_email`, `bookORcheckin`, `bookTime`) VALUES ('" + require.body.houseId + "','" + require.body.linkman_user + "','" + require.body.renter_user + "','" + require.body.renter_name + "','" + require.body.renter_phone + "','" + require.body.renter_email + "','" + require.body.bookORcheckin + "','" + require.body.bookTime + "');"
                        console.log(sql);
                        connection.query(sql, function (err, data) {
                            if (err) {
                                console.log(err);
                            } else {
                                if (data.affectedRows > 0) {
                                    response.send('预订成功，请等待房东联系');
                                    connection.end(); //断开链接
                                } else {
                                    response.send('预订失败');
                                    connection.end(); //断开链接
                                }

                            }
                        })
                    }
                }
            })

        }
    })
}
