var mysql = require('mysql');


exports.release = function (require,response,next) {

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
            connection.query("INSERT INTO `house` (`title`, `rentType`, `houseType`, `houseTheme`, `location_county`, `location_street`, `price`, `linkman_name`, `linkman_user`, `linkman_phone`, `publish_time`, `remark`, `houseArea`) VALUES ('" + require.body.title + "','" + require.body.rentType + "','" + require.body.houseType + "','" + require.body.houseTheme + "','" + require.body.location_county + "','" + require.body.location_street + "','" + require.body.price + "','" + require.body.linkman_name + "','" + require.body.linkman_user + "','" + require.body.linkman_phone + "','" + require.body.publish_time + "','" + require.body.remark + "','" + require.body.houseArea + "');", function (err, data) {
                if (err) {
                    console.log(err);
                } else {
                    if (data.affectedRows > 0) {
                        response.send('发布成功');
                        connection.end(); //断开链接
                    } else {
                        response.send('发布失败');
                        connection.end(); //断开链接
                    }

                }
            })
        }
    })


}