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

const getTeamsByGame = (knex, gameId) => knex.from('team').where({ gameId });

const insertTeam = (knex, { name, gameId, captainId }) =>
  knex.insert({ name, gameId, captainId }).into('team');

const getTeamRoster = (knex, { teamId, playerId }) => {
  const query = knex.raw(
    `
    SELECT
      player.id,
      player.username,
      player.email
    FROM player
    LEFT JOIN team_roster
      ON team_roster.playerId = player.id
    ${
      playerId
        ? 'WHERE team_roster.playerId = :playerId AND team_roster.teamId = :teamId;'
        : 'WHERE team_roster.teamId = :teamId;'
    }
      
  `,
    { playerId, teamId }
  );
  // const subQuery = knex
  //   .column('playerId')
  //   .select()
  //   .from('team_roster')
  //   .where({ teamId });

  // if (playerId) {
  //   subQuery.where({ playerId }).first();
  // }

  // const query = knex
  //   .column(['id', 'username', 'email'])
  //   .select()
  //   .from('player')
  //   .whereIn('id', subQuery);

  return query;
};

const insertTeamRoster = (knex, { playerId, teamId }) =>
  knex('team_roster').insert({
    teamId,
    playerId
  });

module.exports = {
  getTeamById,
  getTeamByName,
  getTeamsByGame,
  insertTeam,
  getTeamRoster,
  insertTeamRoster
};
