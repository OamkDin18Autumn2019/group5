const { check, body, validationResult } = require('express-validator');
const httpError = require('http-errors');
const teamQueries = require('../team/teamQueries');

const teamCaptainCheck = body('teamId', 'User is not captain of team.')
  .custom(async (teamId, { req }) => {
    const { user } = req;
    const { knex } = req.context;

    try {
      const teamData = await teamQueries.getTeamById(knex, teamId);
      const userIsCaptain = teamData.captainId === req.user.id;

      if (!userIsCaptain) {
        throw httpError(401, 'User is not captain of team.');
      }

      return userIsCaptain;
    } catch (e) {
      throw e;
    }
  })
  .bail();

const usernameCheck = body(
  'username',
  'Username should be at least 2 characters and maximum of 20 characters.'
)
  .trim()
  .not()
  .isEmpty()
  .isLength({ min: 2, max: 20 })
  .trim();

const emailCheck = body('email', 'Email is not valid.')
  .isEmail()
  .normalizeEmail();

const passwordCheck = body(
  'password',
  'Password should be at least 6 characters.'
).isLength({ min: 6 });

const passwordConfirmationCheck = body(
  'passwordConfirmation',
  'Password confirmation does not match password.'
).custom(
  (passwordConfirmation, { req }) => passwordConfirmation === req.body.password
);

const validate = (req, res, next) => {
  const errors = validationResult(req).formatWith(({ msg }) => msg);

  if (!errors.isEmpty()) {
    next(httpError(400, 'Validation error', { errors: errors.mapped() }));
  }

  const { username, email, password } = req.body;

  req.context.userRegistrationData = { username, email, password };

  next();
};

const userRegistration = [
  usernameCheck,
  emailCheck,
  passwordCheck,
  passwordConfirmationCheck,
  validate
];

module.exports = { teamCaptainCheck, usernameCheck, userRegistration };
