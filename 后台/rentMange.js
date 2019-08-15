var mysql = require('mysql');
exports.rentMange = function (require,response,next) {
    var poll = mysql.createPool({
        host:'localhost', //链接地址
        'port':'3306', //接口， 3306为默认接口
        'user':'root', //数据库用户名
        'password':'123456', //密码
        'database':'house_rent', //库名
    })

    poll.getConnection(function (err,connection) {
        if (err)console.log(err)
        else {
            if (require.body.step == '1'){
                let sql = "update bookhouse set bookORcheckin = '2' WHERE houseId = '"+require.body.houseId+"' AND renter_user = '"+require.body.renter_user+"'"
                connection.query(sql, function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        if (data.affectedRows > 0) {
                            response.send("成功");
                            connection.end(); //断开链接
                        } else {
                            response.send('失败');
                            connection.end(); //断开链接
                        }

                    }
                })
            }
            else if (require.body.step == '2'){
                let state = {
                    1:false,
                    2:false
                }
                let sql = "UPDATE bookhouse SET bookORcheckin = '3', rentTime = '" + require.body.rentTime + "', endTime = '" + require.body.endTime + "' WHERE houseId = '"+require.body.houseId+"' AND renter_user = '"+require.body.renter_user+"' AND linkman_user = '"+require.body.linkman_user+"';"
                connection.query(sql, function (err, data) {
                    if (err) {
                        console.log(err);
                    } else {
                        if (data.affectedRows > 0) {
                            state[1] = true;
                            let sql1 = "update house set occupancy = 'true' WHERE id = '"+require.body.houseId+"'"
                            connection.query(sql1, function (err, data) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    if (data.affectedRows > 0) {
                                        state[2] = true
                                        if (state[1] && state[2]){
                                            response.send("操作成功");
                                            connection.end(); //断开链接
                                        }
                                    } else {
                                        response.send('操作失败');
                                        connection.end(); //断开链接
                                    }

                                }
                            })

                        } else {
                            response.send('操作失败');
                            connection.end(); //断开链接
                        }

                    }
                })


            }
            else if (require.body.step == '0') {
                connection.query("SELECT * FROM `bookhouse` LEFT JOIN `house` ON bookhouse.houseId = house.id WHERE bookhouse.linkman_user = '" + require.body.user + "'", function (err, data) {
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
            else if (require.body.step == '3'){
                connection.query("DELETE FROM `bookhouse` WHERE `key` = '"+require.body.key+"'", function (err, data) {
                    if (err) {
                        console.log(err);
                        response.send("操作失败")
                    } else {
                        let sql1 = "update house set occupancy = 'false' WHERE id = '"+require.body.houseId+"'"
                        connection.query(sql1, function (err, data) {
                            if (err) {
                                console.log(err);
                            } else {
                                if (data.affectedRows > 0) {
                                        response.send("操作成功");
                                        connection.end(); //断开链接
                                } else {
                                    response.send('操作失败');
                                    connection.end(); //断开链接
                                }

                            }
                        })
                    }
                })
            }
            else if (require.body.step == '4'){
                if (require.body.dataArr.length > 0){
                    require.body.dataArr.forEach((value)=>{
                        let sql = "DELETE FROM `bookhouse` WHERE `key` = '"+value.key+"'"
                        connection.query(sql,function (err,data) {
                            if (err) {
                                console.log(err);
                                response.send("删除失败")
                                connection.end();
                            }
                            else {
                            }
                        })
                    })
                    response.send('删除成功')
                    connection.end();
                }
            }
            else if (require.body.step == '5'){
                let sql
                if (!require.body.houseId) {
                    sql = "SELECT * FROM `bookhouse` LEFT JOIN `house` ON bookhouse.houseId = house.id WHERE bookhouse.linkman_user = '" + require.body.linkman_user + "'"
                }else {
                    sql = "SELECT * FROM `bookhouse` LEFT JOIN `house` ON bookhouse.houseId = house.id WHERE bookhouse.houseId = '"+require.body.houseId+"' AND bookhouse.linkman_user = '"+require.body.linkman_user+"'";

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

            }
            else if (require.body.step == '6'){
                connection.query("SELECT * FROM `bookhouse` LEFT JOIN `house` ON bookhouse.houseId = house.id WHERE bookhouse.renter_user = '" + require.body.user + "'", function (err, data) {
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
            else if (require.body.step == '7'){
                let sql
                if (!require.body.rentType) {
                    sql = "SELECT * FROM `bookhouse` LEFT JOIN `house` ON bookhouse.houseId = house.id WHERE bookhouse.renter_user = '" + require.body.renter_user + "'"
                }else {
                    sql = "SELECT * FROM `bookhouse` LEFT JOIN `house` ON bookhouse.houseId = house.id WHERE house.rentType like '%" + require.body.rentType + "%' AND bookhouse.renter_user = '"+require.body.renter_user+"'";

                }
                console.log(sql);
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
            }
            else if (require.body.step == '8'){
                let sql;
                let haolei = {
                    1:"bookTime",
                    2:"bookTime",
                    3:"rentTime",
                }
                sql = "SELECT * FROM `bookhouse` LEFT JOIN `house` ON bookhouse.houseId = house.id WHERE "
                if (require.body.startTime != "false"){
                    sql += "bookhouse."+haolei[require.body.haolei]+" >= '" + require.body.startTime + "-01' AND "
                }
                if (require.body.endTime != "false") {
                    sql += "bookhouse."+haolei[require.body.haolei]+" <= '" + require.body.endTime + "-01' AND "
                }
                sql +=  "bookhouse.linkman_user = '" + require.body.linkman_user + "'"
                console.log(sql);
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
            }
        }
    })

}