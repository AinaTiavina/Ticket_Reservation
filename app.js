const express = require('express');
const { clientRoutes, eventRoutes, authenticationRoutes } = require('./src/Routes')
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