const authServices = require('../src/auth/authServices');

const seed = async knex => {
  await knex('player').del();

  const registerTasks = [...Array(100).keys()].map(number => {
    return authServices.registerUser(knex, {
      username: `player${number}`,
      email: `player${number}@lmao.lol`,
      password: '111111'
    });
  });

  await knex.transaction(async trx => {
    await Promise.all([
      authServices.registerUser(trx, {
        username: 'root',
        email: 'root@lmao.lol',
        password: '111111'
      }),
      ...registerTasks
    ]);
  });
};

module.exports = { seed };
