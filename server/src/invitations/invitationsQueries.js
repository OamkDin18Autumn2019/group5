const getInvitationById = (knex, id) =>
  knex('request')
    .where({ id })
    .first();

const getInvitationsByPlayerAndTeam = (knex, { playerId, teamId, state }) => {
  const query = knex('request')
    .column(
      'request.id',
      'request.state',
      { gameId: 'game.id' },
      { gameName: 'game.name' },
      { teamId: 'team.id' },
      { teamName: 'team.name' },
      { captainName: 'player.username' }
    )
    .where({ playerId })
    .leftJoin('team', 'request.teamId', 'team.id')
    .leftJoin('game', 'game.id', 'team.gameId')
    .leftJoin('player', 'request.playerId', 'player.id');

  if (teamId) {
    query.where({ teamId });
  }

  if (state) {
    query.where({ state });
  }

  return query;
};

const insertInvitation = (knex, { playerId, teamId, origin }) =>
  knex.insert({ playerId, teamId, origin }).into('request');

const updateInvitationState = (knex, { id, state }) =>
  knex('request')
    .update({ state })
    .where({ id });

module.exports = {
  getInvitationById,
  getInvitationsByPlayerAndTeam,
  insertInvitation,
  updateInvitationState
};
