const { body, validationResult } = require('express-validator');
const httpError = require('http-errors');
const { teamCaptainCheck, usernameCheck } = require('../auth/authValidations');

const stateCheck = body('state', "State can be 'accepted' or 'refused'.")
  .trim()
  .not()
  .isEmpty()
  .isIn(['accepted', 'refused']);

const validate = (req, res, next) => {
  const errors = validationResult(req).formatWith(({ msg }) => msg);

  if (!errors.isEmpty()) {
    next(httpError(400, 'Validation error', { errors: errors.mapped() }));
  }

  next();
};

const playerInvitation = [
  teamCaptainCheck,
  usernameCheck,
  validate,
  (req, res, next) => {
    const { username, teamId } = req.body;

    req.context.invitationData = { username, teamId };

    next();
  }
];

const invitationUpdate = [
  stateCheck,
  validate,
  (req, res, next) => {
    const { invitationId } = req.params;
    const { state } = req.body;
    const { id } = req.user;

    req.context.invitationData = { id: invitationId, state, playerId: id };

    next();
  }
];

module.exports = { playerInvitation, invitationUpdate };
