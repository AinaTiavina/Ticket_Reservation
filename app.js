const express = require('express');
const eventRoutes = require('./src/Routes/Event.routes');
const clientRoutes = require('./src/Routes/Client.routes');
const app = express();

app.use(express.json());

app.use('/api/events', eventRoutes);
app.use('/api/clients', clientRoutes);

module.exports = app;