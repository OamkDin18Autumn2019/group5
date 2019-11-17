const { Router } = require('express');
const httpErrors = require('http-errors');
const teamServices = require('./teamServices');
const teamValidations = require('./teamValidations');
const passport = require('../config/passport/passport');

const teamRouter = new Router();

teamRouter.use(passport.authenticate('jwt', { session: false }));

const registerTeam = async (req, res, next) => {
  const { knex, teamRegistrationData } = req.context;

  try {
    const team = await teamServices.registerTeam(knex, teamRegistrationData);

    return res.data(201, { team });
  } catch (e) {
    if (e.code === 'ER_DUP_ENTRY') {
      const forbiddenError = httpErrors(
        403,
        `Team name '${teamRegistrationData.name}' already exists`
      );
      return next(forbiddenError);
    }
    return next(e);
  }
};

teamRouter.post('/', [teamValidations.teamRegistration, registerTeam]);

module.exports = teamRouter;
