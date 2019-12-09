const getInvitationById = (knex, id) =>
  knex('request')
    .where({ id })
    .first();

const getInvitationByPlayerAndTeam = (knex, { playerId, teamId, state }) => {
  const query = knex('request').where({ playerId, teamId });

  if (state) {
    query.where({ state });
  }

  query.first();

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
  getInvitationByPlayerAndTeam,
  insertInvitation,
  updateInvitationState
};
