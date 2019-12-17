require('dotenv').config();
const express = require('express');
const cors = require('cors');
const httpError = require('http-errors');
const knex = require('./config/database/knex');
const authRouter = require('./auth/authRouter');
const teamRouter = require('./team/teamRouter');
const invitationsRouter = require('./invitations/invitationsRouter');
const invitationsServices = require('./invitations/invitationsServices');
const passport = require('./config/passport/passport');
const { commonResponse, context } = require('./config/utils');

const app = express();
const port = 8080;

app.use([
  cors(),
  express.urlencoded({ extended: true }),
  express.json(),
  commonResponse,
  context(knex)
]);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/teams', teamRouter);
app.use('/api/v1/invitations', invitationsRouter);

app.get('/api/v1/user', [
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    const invitations = await invitationsServices.getInvitations(
      req.context.knex,
      req.user.id
    );
    return res.data(null, { user: req.user, invitations });
  }
]);

app.use((err, req, res, next) => {
  console.error(err);

  if (!err.status) {
    const serverError = httpError(500);
    res.error(serverError.status, serverError);
  } else {
    res.error(err.status, err);
  }

  return next(err);
});

app.listen(port, () => console.log(`App listening on port ${port}`));
