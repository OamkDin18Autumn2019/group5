const { Router } = require('express');
const passport = require('../config/passport/passport');
const jwt = require('jsonwebtoken');
const httpErrors = require('http-errors');
const { registerUser } = require('../auth/authData');

const authRouter = new Router();

authRouter.post('/register', async (req, res, next) => {
  const { username, email, password, passwordConfirmation } = req.body;

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!isValidEmail) {
    const invalidEmail = httpErrors(400, `Email is not valid`);
    return next(forbiddeinvalidEmailnError);
  }

  try {
    const userRegistered = await registerUser(
      username,
      email,
      password,
      passwordConfirmation
    );
    if (!userRegistered) {
      return next(httpErrors(500));
    }
    return res.data();
  } catch (e) {
    if (e.code === 'ER_DUP_ENTRY') {
      const forbiddenError = httpErrors(
        403,
        `User '${username}' already exists`
      );
      return next(forbiddenError);
    }
    return next(e);
  }
});

authRouter.post(
  '/token',
  passport.authenticate('local', { session: false }),
  (req, res) => {
    const accessToken = jwt.sign(
      { id: req.user.id },
      process.env.PASSPORT_SECRET
    );
    res.data(null, { accessToken });
  }
);

module.exports = authRouter;
