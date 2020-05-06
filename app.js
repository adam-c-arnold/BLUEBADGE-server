require('dotenv').config();


var express = require('express');
var app = express();
//var test = require('./controllers/testcontroller');
//var authTest = require('./controllers/authtestcontroller');

var sequelize = require('./db');
var user = require('./controllers/usercontroller');

sequelize.sync(); //{force: true } for resetting data tables
app.use(require('./middleware/headers'));
app.use(express.json());



//app.use('/test', test);

app.use('/api/user', user);
app.use(require('./middleware/validate-session'));
//app.use('/authtest', authTest);



app.listen(process.env.PORT, function() {
    console.log('hello from hell!')
});









// app.use('/api/test', function(req,res) {
//     res.send("this is data from api test endpoint")
// });