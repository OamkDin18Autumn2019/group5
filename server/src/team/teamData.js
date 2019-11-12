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
  const team = await knex.transaction(async trx => {
    const teamRegister = await trx
      .insert({ name, gameId, captainId })
      .into('team');

    if (teamRegister && !!teamRegister.length) {
      await trx('team_roster').insert({
        playerId: captainId,
        teamId: teamRegister[0]
      });
    }

    const team = await trx('team')
      .where('id', teamRegister[0])
      .first();
    return team;
  });

  return team;
};

module.exports = { getTeam, registerTeam };
