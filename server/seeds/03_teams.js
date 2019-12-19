const authServices = require('../src/auth/authServices');
const teamServices = require('../src/team/teamServices');
const fetch = require('node-fetch');

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

  const key = await (await fetch(
    'https://random-word-api.herokuapp.com/key?'
  )).text();

  const words = await (await fetch(
    `http://random-word-api.herokuapp.com/word?key=${key}&number=20`
  )).json();

  const registerTasks = words.map(word => {
    return teamServices.registerTeam(knex, {
      name: `Team ${word}`,
      captainId: rootUser.id,
      gameId: Math.floor(Math.random() * 3 + 1)
    });
  });

  await knex.transaction(async trx => {
    await Promise.all(
      mainTeams.map(mainTeam => teamServices.registerTeam(trx, mainTeam))
    );
  });
};

module.exports = { seed };
