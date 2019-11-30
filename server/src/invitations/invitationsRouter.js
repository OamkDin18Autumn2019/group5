const { Router } = require('express');
const passport = require('../config/passport/passport');
const httpErrors = require('http-errors');
const invitationsValidations = require('./invitationsValidations');
const invitationsServices = require('./invitationsServices');

const invitationsRouter = new Router();

invitationsRouter.use(passport.authenticate('jwt', { session: false }));

invitationsRouter.post('/', [
  invitationsValidations.playerInvitation,
  async (req, res, next) => {
    const { knex, invitationData } = req.context;

    try {
      const invitation = await invitationsServices.invitePlayerToTeam(
        knex,
        invitationData
      );

      return res.data(null, { invitation });
    } catch (e) {
      return next(e);
    }
  }
]);

module.exports = invitationsRouter;
