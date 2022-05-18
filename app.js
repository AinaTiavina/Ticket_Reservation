const express = require('express');
const { clientRoutes, eventRoutes, authenticationRoutes } = require('./src/Routes')
const sequelize = require('./src/Services/database.service');
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

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
app.use(authenticationRoutes);

module.exports = app;