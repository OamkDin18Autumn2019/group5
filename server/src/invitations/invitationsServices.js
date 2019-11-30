const authQueries = require('../auth/authQueries');
const invitationsQueries = require('./invitationsQueries');
const teamQueries = require('../team/teamQueries');

const invitePlayerToTeam = async (knex, { username, teamId }) => {
  const playerData = await authQueries.getUserByUsernameOrEmail(knex, username);

  if (!playerData) {
    const error = new Error('Player could not be found.');
    error.name = 'PlayerNotFound';
    throw error;
  }

  const playerIsInTeam = await teamQueries.getTeamRoster(knex, {
    teamId,
    playerId: playerData.id
  });

  if (playerIsInTeam) {
    const error = new Error(`${username} is already in the team.`);
    error.name = 'ExistingInvitation';
    throw error;
  }

  const existingInvitation = await invitationsQueries.getInvitationByPlayerAndTeam(
    knex,
    { playerId: playerData.id, teamId }
  );

  if (existingInvitation) {
    const error = new Error(
      `${username} has already been invited to the team.`
    );
    error.name = 'ExistingInvitation';
    throw error;
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
