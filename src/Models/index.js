const client = require('./Client.model');
const event = require('./Event.model');
const reservation = require('./Reservation.model');

client.hasMany(reservation, {
    foreignKey: {
        foreignKey: 'clientId',
        allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

event.hasMany(reservation, {
    foreignKey: {
        foreignKey: 'eventId',
        allowNull: false
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

module.exports = {
    client,
    event,
    reservation
};