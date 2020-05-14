require("dotenv").config();

const express = require("express");
const app = express();
//const test = require('./controllers/testcontroller');
//const authTest = require('./controllers/authtestcontroller');

const sequelize = require("./db");
const user = require("./controllers/usercontroller");
const log = require("./controllers/logcontroller");

sequelize.sync(); //{force: true } for resetting data tables
app.use(express.json());

app.use(require("./middleware/headers"));

//app.use('/test', test);

app.use("/user", user);
app.use(require("./middleware/validate-session"));
//app.use('/authtest', authTest);
app.use("/log", log);

app.listen(process.env.PORT, function () {
    console.log(`hello from hell! ${process.env.PORT}`);
});

// app.use('/api/test', function(req,res) {
//     res.send("this is data from api test endpoint")
// });
