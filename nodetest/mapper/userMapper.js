const connection = require('../config/db/connection');
const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;

//the methodes for user CRUD 


module.exports.all = allUser = () => {
    return new Promise((resolve, reject) => {
        connection.makeConnection().then(db => {
            const request = new Request("select * from users", (err) => {
                if (err) {
                    reject(err);
                }
            })
            let result = [];
            request.on("row", (columns) => {
                columns.forEach((column) => {
                    if (column.value == null) {
                        console.log("null");
                    } else {
                        result.push(column.value);
                    }
                });
                resolve(result);

            });

            request.on("done", (rowCount, more) => {
                console.log(rowCount + ' rows returned');
            });
            db.execSql(request);
        })
    })
}


module.exports.single = singelUser = (id) => {
    return new Promise((resolve, reject) => {
        connection.makeConnection().then(db => {
            const request = new Request("select * from users where id= @id  ", (err) => {
                if (err) {
                    reject(err);
                }
            })
            request.addParameter("id", TYPES.Int, id);
            let result = "";
            request.on("row", (columns) => {
                columns.forEach((column) => {
                    if (column.value == null) {
                        console.log("null");
                    } else {
                        result += column.value + " ";
                    }
                });
                result += "";
                resolve(result);

            });

            request.on("done", (rowCount, more) => {
                console.log(rowCount + ' rows returned');
            });
            db.execSql(request);
        })
    })
}





module.exports.delete = deleteUser = (id) => {

    return new Promise((resolve, reject) => {
        connection.makeConnection().then(db => {
            const request = new Request("delete from users where id = @id", (err) => {
                if (err) {
                    reject(err);
                }
            })
            request.addParameter("id", TYPES.Int, id);
            let result = "";
            request.on("row", (columns) => {
                columns.forEach((column) => {
                    if (column.value == null) {
                        console.log("null");
                    } else {
                        result += "user with id " + id + " is removed form the databes";
                    }
                });
                resolve(result);

            });

            request.on("done", (rowCount, more) => {
                console.log(rowCount + ' rows returned');
            });
            db.execSql(request);
        })
    })

}
module.exports.insert = insert = (firstName, lastName, mail, password) => {
    return new Promise((resolve, reject) => {
        connection.makeConnection().then(db => {
            const request = new Request("INSERT users (first_name, last_name, email, password) OUTPUT INSERTED.id VALUES (@first_name, @last_name, @email, @password);", (err) => {
                if (err) {
                    reject(err);
                }
            })
            request.addParameter("first_name", TYPES.NVarChar, firstName);
            request.addParameter("last_name", TYPES.NVarChar, lastName);
            request.addParameter("email", TYPES.NVarChar, mail);
            request.addParameter("password", TYPES.NVarChar, password);
            let result = "";
            request.on("row", (columns) => {
                columns.forEach((column) => {
                    if (column.value == null) {
                        console.log("null");
                    } else {
                        result += column.value + " ";
                    }
                });
                result += "";
                resolve(result);

            });

            request.on("done", (rowCount, more) => {
                console.log(rowCount + ' rows returned');
            });
            db.execSql(request);
        })
    })

}

module.exports.edit = edit = (firstName, lastName, mail, password, id) => {
    return new Promise((resolve, reject) => {
        connection.makeConnection().then(db => {
            const request = new Request("update users set first_name = @first_name, last_name = @last_name, email = @email, password = @password where id = @id", (err) => {
                if (err) {
                    reject(err);
                }
            })
            request.addParameter("first_name", TYPES.NVarChar, firstName);
            request.addParameter("last_name", TYPES.NVarChar, lastName);
            request.addParameter("email", TYPES.NVarChar, mail);
            request.addParameter("password", TYPES.NVarChar, password);
            request.addParameter("id", TYPES.Int, id);
            let result = "";
            request.on("row", (columns) => {
                columns.forEach((column) => {
                    if (column.value == null) {
                        console.log("null");
                    } else {
                        result += column.value + " ";
                    }
                });
                result += "";
                resolve(result);

            });

            request.on("done", (rowCount, more) => {
                console.log(rowCount + ' rows returned');
            });
            db.execSql(request);
        })
    })

}
