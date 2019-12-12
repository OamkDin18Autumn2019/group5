const getUserById = (knex, id) =>
  knex('player')
    .where({ id })
    .first();

const getUserByUsernameOrEmail = (knex, usernameOrEmail) =>
  knex('player')
    .where({ username: usernameOrEmail })
    .orWhere({ email: usernameOrEmail })
    .first();

const insertPlayer = (knex, { username, email, password }) =>
  knex('player').insert({ username, email, password });

module.exports = { getUserById, getUserByUsernameOrEmail, insertPlayer };
