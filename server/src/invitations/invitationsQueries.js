const getInvitationById = (knex, id) =>
  knex('request')
    .where({ id })
    .first();

const getInvitationByPlayerAndTeam = (knex, { playerId, teamId }) =>
  knex('request')
    .where({ playerId, teamId })
    .first();

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
