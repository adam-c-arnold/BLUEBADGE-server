module.exports = (sequelize, DataTypes) => {

const Log =  sequelize.define('log', {
    

    location: {
        type: DataTypes.STRING,
        allowNull: true
    },

    rideDistance: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    rideWatts: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    rideTime: {
        type: DataTypes.INTEGER,
        allowNull: false
    }



    
    
})
return Log;

}