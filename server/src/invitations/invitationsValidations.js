const { body, validationResult } = require('express-validator');
const httpError = require('http-errors');
const { teamCaptainCheck, usernameCheck } = require('../auth/authValidations');

const validate = (req, res, next) => {
  const errors = validationResult(req).formatWith(({ msg }) => msg);

  if (!errors.isEmpty()) {
    next(httpError(400, 'Validation error', { errors: errors.mapped() }));
  }

  const { username, teamId } = req.body;

  req.context.invitationData = { username, teamId };

  next();
};

const playerInvitation = [teamCaptainCheck, usernameCheck, validate];

module.exports = { playerInvitation };
