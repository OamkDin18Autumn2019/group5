const authServices = require('../src/auth/authServices');
const teamServices = require('../src/team/teamServices');

const seed = async knex => {
  const rootUser = await authServices.authenticateFromCredentials(knex, {
    usernameOrEmail: 'root',
    password: '111111'
  });

  const mainTeams = [
    {
      name: 'Heikkinen Bros & Hackerman',
      captainId: rootUser.id,
      gameId: 1
    }
  ];

  const registerTasks = [...Array(20).keys()].map(number => {
    return teamServices.registerTeam(knex, {
      name: `Team ${number}`,
      captainId: rootUser.id,
      gameId: Math.floor(Math.random() * 3 + 1)
    });
  });

  await knex.transaction(async trx => {
    await Promise.all([
      ...mainTeams.map(mainTeam => teamServices.registerTeam(trx, mainTeam))
    ]);
  });
};

module.exports = { seed };
