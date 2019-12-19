const authServices = require('../src/auth/authServices');

const seed = async knex => {
  const mainUsers = [
    {
      username: 'root',
      email: 'root@lmao.lol',
      password: '111111'
    },
    {
      username: 'diego',
      email: 'diego@lmao.lol',
      password: '111111'
    },
    {
      username: 'eetu',
      email: 'eetu@lmao.lol',
      password: '111111'
    },
    {
      username: 'riku',
      email: 'riku@lmao.lol',
      password: '111111'
    }
  ];

  const registerTasks = [...Array(200).keys()].map(number => {
    return knex =>
      authServices.registerUser(knex, {
        username: `player${number}`,
        email: `player${number}@lmao.lol`,
        password: '111111'
      });
  });

  await knex.transaction(async trx => {
    await Promise.all([
      ...mainUsers.map(user => authServices.registerUser(trx, user)),
      ...registerTasks.map(task => task(trx))
    ]);
  });
};

module.exports = { seed };
