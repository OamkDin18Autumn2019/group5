const getTeamById = (knex, id) =>
  knex('team')
    .where({ id })
    .first();

const getTeamByName = (knex, { name, gameId }) =>
  knex
    .from('team')
    .where({ name })
    .andWhere({ gameId })
    .first();

const insertTeam = (knex, { name, gameId, captainId }) =>
  knex.insert({ name, gameId, captainId }).into('team');

const insertTeamRoster = (knex, { playerId, teamId }) =>
  knex('team_roster').insert({
    teamId,
    playerId
  });

module.exports = { getTeamById, getTeamByName, insertTeam, insertTeamRoster };
