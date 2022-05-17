const express = require('express');
const eventRoutes = require('./src/Routes/Event.routes');
const clientRoutes = require('./src/Routes/Client.routes');
const authenticationRoutes = require('./src/Routes/auth.routes');
const sequelize = require('./src/Services/database.service');
const app = express();

sequelize.sync({alter: false, force: false})
    .then(() => {
        console.log('Synchronized successfully');
    })
    .catch(err => {
        console.log(err.message);
});

app.use(express.json());

app.use('/api/events', eventRoutes);
app.use('/api/clients', clientRoutes);
app.use('', authenticationRoutes);

module.exports = app;