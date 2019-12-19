const authServices = require('../src/auth/authServices');
const { insertInvitation } = require('../src/invitations/invitationsQueries');

const seed = async knex => {
  const mainUsers = await knex('player')
    .column('id')
    .whereIn('username', ['diego', 'eetu', 'riku']);

  const mainUsersIds = mainUsers.map(user => user.id);

  const getRandomTeams = knex.raw(
    `
      SELECT id FROM team
      WHERE id IN (SELECT teamId FROM team_roster WHERE playerId NOT IN (:mainUsersIds))
      ORDER BY RAND()
      LIMIT 3
  `,
    {
      mainUsersIds
    }
  );

  const teams = await knex('team').column('id');

  const invitationsTasks = await mainUsersIds.reduce(async (tasks, userId) => {
    const teams = await getRandomTeams;

    return [
      ...(await tasks),
      ...teams[0].map(team => knex =>
        insertInvitation(knex, {
          playerId: userId,
          teamId: team.id,
          origin: 'team'
        })
      )
    ];
  }, []);

  await knex.transaction(async trx => {
    for (let i = 0; i < invitationsTasks.length; i++) {
      await invitationsTasks[i](trx);
    }
  });
};

module.exports = { seed };
