const Team = require('./Team');
const Player = require('../players/Player');
const teamQueries = require('./teamQueries');

const getTeams = async (knex, { gameId }) => {
  const teamsData = await teamQueries.getTeamsByGame(knex, gameId);

  const teams = teamsData.map(teamData => new Team(teamData));

  return teams;
};

const getTeam = async (knex, { id }, userId) => {
  const teamData = await teamQueries.getTeamById(knex, id);

  if (!teamData) {
    throw new Error('Team does not exist');
  }

  const userIsCaptain = teamData.captainId === userId;

  const playersData = (await teamQueries.getTeamRoster(knex, {
    teamId: id
  }))[0];

  const players = playersData.map(playerData => new Player(playerData));

  const team = new Team({
    ...teamData,
    canInvitePlayers: userIsCaptain,
    players
  });

  return { team };
};

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

    await addPlayerToTeam(trx, { playerId: captainId, teamId });

    const teamData = await teamQueries.getTeamById(trx, teamId);

    return teamData;
  });

  if (!teamData) {
    throw new Error('Team data could not be retrieved.');
  }

  const team = new Team(teamData);

  return team;
};

const addPlayerToTeam = async (knex, { playerId, teamId }) => {
  const teamRosterId = await teamQueries.insertTeamRoster(knex, {
    playerId,
    teamId
  });

  if (!teamRosterId) {
    throw new Error('Player could not be added to the team.');
  }

  return teamRosterId;
};

module.exports = { getTeams, getTeam, registerTeam, addPlayerToTeam };
