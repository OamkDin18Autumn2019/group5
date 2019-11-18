const { body, validationResult } = require('express-validator');
const httpError = require('http-errors');

const nameCheck = body('name')
  .trim()
  .not()
  .isEmpty()
  .isLength({ min: 2, max: 20 })
  .withMessage(
    'Team name should be at least 2 characters and maximum of 20 characters.'
  );

const gameIdCheck = body('gameId')
  .toInt()
  .not()
  .isEmpty()
  .isInt();

const validate = (req, res, next) => {
  const errors = validationResult(req).formatWith(({ msg }) => msg);

  if (!errors.isEmpty()) {
    next(httpError(400, 'validation error', { errors: errors.mapped() }));
  }

  const { name, gameId } = req.body;
  const captainId = req.user.id;

  req.context.teamRegistrationData = { name, gameId, captainId };

  next();
};

const teamRegistration = [nameCheck, gameIdCheck, validate];

module.exports = { teamRegistration };
