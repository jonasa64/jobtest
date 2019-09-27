
const config = require("../config");
const Connection = require('tedious').Connection;

//reusable Connection
const makeConnection = () => {

    const sqlConfig = {
        server: config.server,  
        authentication: {
            type: 'default',
            options: {
                userName: config.user, 
                password: config.password  
            }
        },
        options: {
            // If you are on Microsoft Azure, you need encryption:
            encrypt: true,
            database: config.database  
        }
    };

    return new Promise((resolve, reject) => {
        const connection = new Connection(sqlConfig);
        connection.on('connect', (err) => {
         //close the connection if we get an error
            if (err) {
                connection.close();
                reject(err)
           
            }
            resolve(connection);
            console.log("Connected");


        });
    })

}

module.exports = {
    makeConnection : makeConnection
}












