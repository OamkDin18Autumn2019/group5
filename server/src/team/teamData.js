const knex = require('../config/database/knex');

const getTeamsFromCredentials = async (name, gameId) => {
  const team = await knex
    .from('team')
    .where({ name })
    .orWhere({ gameId })
    .first();
  if (!team) {
    return undefined;
  } else {
    return team;
  }
};

const registerTeam = async (name, gameId, captainId) => {
  const teamRegister = !!(await knex
    .insert({ name, gameId, captainId })
    .into('team'));

  return { teamRegister };
};

module.exports = { getTeamsFromCredentials, registerTeam };
