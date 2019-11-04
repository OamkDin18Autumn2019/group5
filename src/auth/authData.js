const knex = require("../config/database/knex");
const bcrypt = require("bcrypt");
const httpErrors = require("http-errors");

const getUserFromCredentials = async (username, email, password) => {
  if (username && email) {
    throw httpErrors(400, "Provide only username or email to login.");
  }
  let query = knex.from("players");
  if (username) {
    query.where({ username });
  } else if (email) {
    query.where({ email });
  }

  query.andWhere({ password }).first();
  const user = await query;

  if (!user) {
    return undefined;
  }

  const match = await bcrypt.compare(password, user.password);
  return match ? user : undefined;
};

const getUserById = async id => {
  const user = await knex
    .select("id")
    .from("players")
    .where({ id })
    .first();

  return user;
};

const registerUser = async (
  username,
  email,
  password,
  passwordConfirmation
) => {
  if (password < 6) {
    return httpErrors(400, "Password has to be at least 6 characters");
  }
  if (password !== passwordConfirmation) {
    return httpErrors(400, "Passwords don't match");
  }

  const usernameTrimmed = username.trim();
  const emailTrimmed = email.trim();

  const saltRounds = 4;
  const hash = await bcrypt.hash(password, saltRounds);

  const userRegistered = !!(await knex
    .insert({ username: usernameTrimmed, email: emailTrimmed, password: hash })
    .into("players"));

  return userRegistered;
};

module.exports = { getUserFromCredentials, getUserById, registerUser };
