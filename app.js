const express = require('express');
const eventRoutes = require('./src/Routes/Event.routes');
const clientRoutes = require('./src/Routes/Client.routes');
const sequelize = require('./src/Services/database.service');
const app = express();

sequelize.sync({alter:true})
    .then(() => {
        console.log('Synchronized successfully');
    })
    .catch(err => {
        console.log(err);
});

app.use(express.json());

app.use('/api/events', eventRoutes);
app.use('/api/clients', clientRoutes);

module.exports = app;