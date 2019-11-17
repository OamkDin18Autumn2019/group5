const teamRegistration = (req, res, next) => {
  const { name, gameId } = req.body;
  const captainId = req.user.id;

  if (name.length < 2 || name.length > 20) {
    return next(
      httpErrors(
        400,
        'Team name should be at least 2 characters and maximum of 20 characters.'
      )
    );
  }

  if (isNaN(gameId)) {
    return next(httpErrors(400, 'Game id can only be a number.'));
  }

  req.context.teamRegistrationData = { name, gameId, captainId };

  return next();
};

module.exports = { teamRegistration };
