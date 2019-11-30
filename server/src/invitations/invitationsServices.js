const authQueries = require('../auth/authQueries');
const invitationsQueries = require('./invitationsQueries');

const invitePlayerToTeam = async (knex, { username, teamId }) => {
  const playerData = await authQueries.getUserByUsernameOrEmail(knex, username);

  if (!playerData) {
    throw new Error('Player could not be found.');
  }

  const invitationId = await invitationsQueries.insertInvitation(knex, {
    playerId: playerData.id,
    teamId,
    origin: 'team'
  });

  if (!invitationId) {
    throw new Error('Invitation failed.');
  }

  const invitationData = await invitationsQueries.getInvitationById(
    knex,
    invitationId
  );

  return invitationData;
};

module.exports = { invitePlayerToTeam };
