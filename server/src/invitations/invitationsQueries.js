const getInvitationById = (knex, id) =>
  knex('request')
    .where({ id })
    .first();

const insertInvitation = (knex, { playerId, teamId, origin }) =>
  knex.insert({ playerId, teamId, origin }).into('request');

module.exports = { getInvitationById, insertInvitation };
