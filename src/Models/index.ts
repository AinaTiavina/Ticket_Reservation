import { client } from './Client.model';
import { event } from './Event.model';
import { reservation } from './Reservation.model';

client.hasMany(reservation, {
    
    foreignKey: 'ClientId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

event.hasMany(reservation, {    
    foreignKey: 'EventId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

module.exports = {
    client,
    event,
    reservation
};