const LocalStrategy = require('passport-local').Strategy;
const { getUserFromCredentials } = require('../../../auth/authData');
const httpErrors = require('http-errors');

const localStrategy = new LocalStrategy(
  async (username, email, password, done) => {
    const user = await getUserFromCredentials(username, email, password);
    return user ? done(null, user) : done(httpErrors(401));
  }
);

module.exports = localStrategy;
