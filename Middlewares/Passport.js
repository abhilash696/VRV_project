const passport_jwt = require("passport-jwt");
const jwtstrategy = passport_jwt.Strategy;
const extractjwt = passport_jwt.ExtractJwt;
const User = require("./../Models/User.js");

const opts = {};

opts.jwtFromRequest = extractjwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.secretOrKey;

module.exports = (passport) => {
  passport.use(
    new jwtstrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then((user) => {
          return done(null, user);
        })
        .catch((error) => {
          return done(error, false);
        });
    })
  );
};
