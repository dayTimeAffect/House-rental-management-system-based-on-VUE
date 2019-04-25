var mysql = require('mysql');
exports.examine = function (require,response,next) {
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
            if (require.body["manage"] == "true") {
                if (!require.body.rentType){
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
                let search = require.body.rentType || require.body.location || require.body.houseArea || require.body.price || 'false';
                if (search != 'false') {
                    let searchCon = {
                        rentType:require.body.rentType,
                        location:require.body.location,
                        houseArea:require.body.houseArea,
                        price:require.body.price
                    }
                    let sql = "SELECT * FROM `house` WHERE ";
                    let index = 0;
                    for (let key in searchCon){
                        if (searchCon[key]){
                            if (index == 0){
                                index++
                            } else {
                                sql += " AND "
                            }
                            switch (key) {
                                case "rentType":
                                    sql += "rentType like '%" + require.body.rentType + "%'"
                                    break;
                                case "location":
                                    sql += "(location_county like '%" + require.body.location + "%' OR location_street like '%" + require.body.location + "%')"
                                    break;
                                case "houseArea":
                                    switch (searchCon.houseArea) {
                                        case '1':
                                            sql += "(houseArea BETWEEN 0 AND 10)"
                                            break
                                        case '2':
                                            sql += "(houseArea BETWEEN 10 AND 20)"
                                            break
                                        case '3':
                                            sql += "(houseArea BETWEEN 20 AND 30)"
                                            break
                                        case '4':
                                            sql += "(houseArea BETWEEN 30 AND 40)"
                                            break
                                        case '5':
                                            sql += "(houseArea BETWEEN 40 AND 50)"
                                            break
                                        case '6':
                                            sql += "(houseArea BETWEEN 50 AND 100)"
                                            break
                                        case '7':
                                            sql += "(houseArea BETWEEN 100 AND 200)"
                                            break
                                        case '8':
                                            sql += "(houseArea > 200)"
                                            break
                                    }
                                    break;
                                case "price":
                                    switch (searchCon.price) {
                                        case '1':
                                            sql += "(price BETWEEN 0 AND 500)"
                                            break
                                        case '2':
                                            sql += "(price BETWEEN 500 AND 1000)"
                                            break
                                        case '3':
                                            sql += "(price BETWEEN 1000 AND 1500)"
                                            break
                                        case '4':
                                            sql += "(price BETWEEN 1500 AND 2000)"
                                            break
                                        case '5':
                                            sql += "(price BETWEEN 2000 AND 3000)"
                                            break
                                        case '6':
                                            sql += "(price BETWEEN 3000 AND 4000)"
                                            break
                                        case '7':
                                            sql += "(price BETWEEN 4000 AND 6000)"
                                            break
                                        case '8':
                                            sql += "(price > 6000)"
                                            break
                                    }
                                    break;
                            }
                        }
                    }
                    connection.query(sql, function (err, data) {
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
        }
    })

}