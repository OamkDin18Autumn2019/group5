const teamServices = require('../team/teamServices');
const invitationsServices = require('../invitations/invitationsServices');

const getUserInformation = async (knex, user) => {
  const userInformation = await knex.transaction(async trx => {
    const teams = await teamServices.getTeams(trx, { playerId: user.id });
    const invitations = await invitationsServices.getInvitations(trx, user.id);

    return { user, teams, invitations };
  });
  return userInformation;
};

module.exports = { getUserInformation };
