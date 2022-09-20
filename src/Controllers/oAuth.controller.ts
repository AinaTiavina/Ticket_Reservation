import passport from "passport";
import dotenv from "dotenv";
import strategy from "passport-google-oauth2";
dotenv.config();

const { client } = require('../Models');

const GoogleStrategy = strategy.Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(obj: any, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        callbackURL: process.env.GOOGLE_CALLBACK_URL as string
    }, function verify(accessToken, refreshToken, profile, cb) {
        console.log(profile);
    }
));