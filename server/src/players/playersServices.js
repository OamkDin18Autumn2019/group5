const teamServices = require('../team/teamServices');
const invitationsServices = require('../invitations/invitationsServices');

const getUserInformation = async (knex, user) => {
  const teams = await teamServices.getTeams(knex, { playerId: user.id });
  const invitations = await invitationsServices.getInvitations(knex, user.id);
  return { user, teams, invitations };
};

module.exports = { getUserInformation };
