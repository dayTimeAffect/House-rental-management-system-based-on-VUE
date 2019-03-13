var mysql = require('mysql');
exports.register =function (require,response,next) {
    console.log(require.body);

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
            if (require.body["manage"]){
                connection.query("SELECT * FROM `manage` WHERE user = '"+require.body.user+"';",function (err,data) {
                    if(err){
                        console.log(err);
                    }else {
                        if (data.length > 0){
                            response.send('用户名已存在');
                            connection.end(); //断开链接
                        }else {
                            connection.query("INSERT INTO `manage` (`user`, `password`, `sex`, `age`, `email`, `phone`, `name`, `manage`) VALUES ('"+require.body.user+"','"+require.body.password+"','"+require.body.sex+"','"+require.body.age+"','"+require.body.email+"','"+require.body.phone+"','"+require.body.name+"','"+require.body.manage+"');",function (err,data) {
                                if(err){
                                    console.log(err);
                                }else {
                                    if (data.affectedRows > 0){
                                        response.send('注册成功');
                                        connection.end(); //断开链接
                                    }else {
                                        response.send('注册失败');
                                        connection.end(); //断开链接
                                    }

                                }
                            })
                        }

                    }
                })

            }else {
                connection.query("SELECT * FROM `tenement` WHERE user = '"+require.body.user+"';",function (err,data) {
                    if(err){
                        console.log(err);
                    }else {
                        if (data.length > 0){
                            response.send('用户名已存在');
                            connection.end(); //断开链接
                        }else {
                            connection.query("INSERT INTO `tenement` (`user`, `password`, `sex`, `age`, `email`, `phone`, `name`, `manage`) VALUES ('"+require.body.user+"','"+require.body.password+"','"+require.body.sex+"','"+require.body.age+"','"+require.body.email+"','"+require.body.phone+"','"+require.body.name+"','"+require.body.manage+"');",function (err,data) {
                                if(err){
                                    console.log(err);
                                }else {
                                    if (data.affectedRows > 0){
                                        response.send('注册成功');
                                        connection.end(); //断开链接
                                    }else {
                                        response.send('注册失败');
                                        connection.end(); //断开链接
                                    }

                                }
                            })
                        }

                    }
                })
            }

        }
    })
}