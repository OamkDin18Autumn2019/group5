const Team = require('./Team');
const teamQueries = require('./teamQueries');

const registerTeam = async (knex, { name, gameId, captainId }) => {
  const teamData = await knex.transaction(async trx => {
    const teamId = await teamQueries.insertTeam(trx, {
      name,
      gameId,
      captainId
    });

    if (!teamId) {
      throw new Error('Team could not be created.');
    }

    const teamRosterId = await teamQueries.insertTeamRoster(trx, {
      playerId: captainId,
      teamId
    });

    if (!teamRosterId) {
      throw new Error('Player could not be added to the team.');
    }

    const teamData = await teamQueries.getTeamById(trx, teamId);

    return teamData;
  });

  if (!teamData) {
    throw new Error('Team data could not be retrieved.');
  }

  const team = new Team(teamData);

  return team;
};

module.exports = { registerTeam };