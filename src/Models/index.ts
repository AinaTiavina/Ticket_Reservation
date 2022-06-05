import { client } from './Client.model';
import { event } from './Event.model';
import { reservation } from './Reservation.model';

client.hasMany(reservation, {
    
    foreignKey: 'clientId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

event.hasMany(reservation, {    
    foreignKey: 'eventId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

module.exports = {
    client,
    event,
    reservation
};