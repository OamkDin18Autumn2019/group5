const knex = require('../config/database/knex');
const bcrypt = require('bcryptjs');
const httpErrors = require('http-errors');
const User = require('./User');

const getUserFromCredentials = async (usernameOrEmail, password) => {
  const userData = await knex
    .from('player')
    .where({ username: usernameOrEmail })
    .orWhere({ email: usernameOrEmail })
    .first();

  if (!userData) {
    return undefined;
  }

  const match = await bcrypt.compare(password, userData.password);

  const user = new User(userData);

  return match ? user : undefined;
};

const getUserById = async id => {
  const userData = await knex
    .from('player')
    .where({ id })
    .first();

  if (!userData) {
    return undefined;
  }

  const user = new User(userData);

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
