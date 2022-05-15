const { DataTypes } = require('sequelize')
const db = require('../Services/database.service');

const Event = db.define('Event', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    numEvent: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(35),
        allowNull: false
    },
    category: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    categoryAge: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    cost: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dateEvent: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    timestamps: false
});

(async () => {
    db.sync({alter: true, force: true})
        .then(() => {
            console.log('The database was successfully synchronized !!!');
        })
        .catch( err => {
            console.log(err);
        });    
})
module.exports = Event;