import express from "express";
import passport from "passport";
const { clientRoutes, eventRoutes, authenticationRoutes, reservationRoutes } = require('./src/Routes')
const app = express();
const cors = require('cors');

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            // access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(passport.initialize());
// configure a static path
app.use(express.static(__dirname+'/public'));

app.use(express.json());

app.use('/api/events', eventRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/reservations', reservationRoutes);
app.use(authenticationRoutes);

module.exports = app;