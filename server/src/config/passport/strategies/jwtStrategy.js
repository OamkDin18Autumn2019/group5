const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const httpErrors = require('http-errors');
const { getUserById } = require('../../../auth/authData');

const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.PASSPORT_SECRET
  },
  async (payload, done) => {
    const user = await getUserById(payload.id);
    return user ? done(null, user) : done(httpErrors(401));
  }
);

module.exports = jwtStrategy;
