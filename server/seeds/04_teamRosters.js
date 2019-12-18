const authServices = require('../src/auth/authServices');
const { insertTeamRoster } = require('../src/team/teamQueries');

const seed = async knex => {
  const mainUsersTask = knex('player')
    .column('id')
    .whereIn('username', ['diego', 'eetu', 'riku']);

  const mainTeamTask = knex('team')
    .column('id')
    .where({ name: 'Heikkinen Bros & Hackerman' });

  const [mainUsers, mainTeam] = await Promise.all([
    mainUsersTask,
    mainTeamTask
  ]);

  const getRandomPlayersWithoutTeam = knex.raw(`
    SELECT id FROM player
    WHERE id NOT in (SELECT playerId from team_roster)
    ORDER BY RAND()
    LIMIT 4
  `);

  const teams = await knex('team')
    .column('id')
    .whereNot('id', mainTeam[0].id);

  const mainRosterTasks = mainUsers.map(user => knex =>
    insertTeamRoster(knex, { playerId: user.id, teamId: mainTeam[0].id })
  );

  const rosterTasks = await teams.reduce(async (tasks, team) => {
    const playersWithoutTeam = await getRandomPlayersWithoutTeam;

    return [
      ...(await tasks),
      ...playersWithoutTeam[0].map(player => knex =>
        insertTeamRoster(knex, { playerId: player.id, teamId: team.id })
      )
    ];
  }, mainRosterTasks);

  await knex.transaction(async trx => {
    for (let i = 0; i < rosterTasks.length; i++) {
      await rosterTasks[i](trx);
    }
  });
};

module.exports = { seed };
