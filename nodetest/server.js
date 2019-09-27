const express = require("express");
const bodyParser = require('body-parser');
const users = require("./api/user/user");
const port = process.env.PORT || 5000;
const path = require("path");

const app = express();



 app.listen(port,() => {
console.log(`port is running on ${port} `);
});






//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use("/users", users);

//404 error
app.use((req,res, next) => {
    res.status(404).sendFile(path.join(__dirname, "views", "notFound.html"));
})


