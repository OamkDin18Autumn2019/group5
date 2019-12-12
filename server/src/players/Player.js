const User = require('../auth/User');

class Player extends User {
  constructor({ id, username, email, fullname }) {
    super({ id, username, email, fullname });
  }
}

module.exports = Player;
