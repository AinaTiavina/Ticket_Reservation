const express = require('express');
const eventRouter = require('./src/Router/Event.route');
const clientRouter = require('./src/Router/Client.route');
const app = express();

app.use(express.json());

app.use('/api/events', eventRouter);
app.use('/api/clients', clientRouter);

module.exports = app;