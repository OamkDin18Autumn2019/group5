require('dotenv').config();
const express = require('express');
const cors = require('cors');
const httpError = require('http-errors');
const authRouter = require('./auth/authRouter');
const teamRouter = require('./team/teamRouter');
const { commonResponse } = require('./config/utils');

const app = express();
const port = 8080;

app.use([
  cors(),
  express.urlencoded({ extended: true }),
  express.json(),
  commonResponse
]);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/teams', teamRouter);

app.use((err, req, res, next) => {
  if (!err.status) {
    const serverError = httpError(500);
    res.error(serverError.status, serverError);
  } else {
    res.error(err.status, err);
  }

  return next(err);
});

app.listen(port, () => console.log(`App listening on port ${port}`));
