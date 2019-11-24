class Team {
  constructor({ id, name, gameId, captainId, recruiting }) {
    this.id = id;
    this.name = name;
    this.gameId = gameId;
    this.captainId = captainId;
    this.recruiting = !!recruiting;
  }
}

module.exports = Team;
