const knex = require('../config/database/knex');
const bcrypt = require('bcryptjs');
const httpErrors = require('http-errors');

const getUserFromCredentials = async (usernameOrEmail, password) => {
  const user = await knex
    .from('player')
    .where({ username: usernameOrEmail })
    .orWhere({ email: usernameOrEmail })
    .andWhere({ password })
    .first();

  if (!user) {
    return undefined;
  }

  const match = await bcrypt.compare(password, user.password);
  return match ? user : undefined;
};

const getUserById = async id => {
  const user = await knex
    .select('id')
    .from('player')
    .where({ id })
    .first();

  return user;
};

const registerUser = async (username, email, password) => {
  const saltRounds = 4;
  const hash = await bcrypt.hash(password, saltRounds);

  const userRegistered = !!(await knex
    .insert({ username, email, password: hash })
    .into('player'));

  return userRegistered;
};

module.exports = { getUserFromCredentials, getUserById, registerUser };
