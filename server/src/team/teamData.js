const knex = require('../config/database/knex');

const getTeam = async (name, gameId) => {
  const team = await knex
    .from('team')
    .where({ name })
    .andWhere({ gameId })
    .first();
  if (!team) {
    return undefined;
  } else {
    return team;
  }
};

const registerTeam = async (name, gameId, captainId) => {
  const teamRegister = await knex
    .insert({ name, gameId, captainId })
    .into('team');

  if (teamRegister && !!teamRegister.length) {
    await knex('team_roster').insert({
      playerId: captainId,
      teamId: teamRegister[0]
    });
  }

  return teamRegister;
};

module.exports = { getTeam, registerTeam };
