require('dotenv').config();
const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.NAME, 'postgres', 'Breck471', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {
        console.log('connected to database')
    },
    function(err){
        console.log(err);
    }
);



module.exports = sequelize;