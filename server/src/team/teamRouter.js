const { Router } = require('express');
const httpErrors = require('http-errors');
const { registerTeam } = require('./teamData');
const passport = require('../config/passport/passport');

const teamRouter = new Router();

teamRouter.use(passport.authenticate('jwt', { session: false }));

teamRouter.post('/', async (req, res, next) => {
  const { name, gameId } = req.body;
  const captainId = req.user.id;

  if (name.length < 2 || name.length > 20) {
    return next(
      httpErrors(
        400,
        'Team name should be at least 2 characters and maximum of 20 characters'
      )
    );
  }
  if (isNaN(gameId)) {
    return next(httpErrors(401, 'Game id can only be a number'));
  }

  try {
    const team = await registerTeam(name, gameId, captainId);

    if (!team) {
      return next(httpErrors(500));
    }
    return res.status(201).json({ team });
  } catch (e) {
    if (e.code === 'ER_DUP_ENTRY') {
      const forbiddenError = httpErrors(
        403,
        `Team name '${name}' already exists`
      );
      return next(forbiddenError);
    }
    return next(e);
  }
});

module.exports = teamRouter;
