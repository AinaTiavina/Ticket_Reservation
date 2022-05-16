const express = require('express');
const router = require('./src/Router/Event.route');
const app = express();

app.use(express.json());

app.use('/api/events', router)

module.exports = app;