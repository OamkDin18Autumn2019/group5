import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

const ListTeams = props => {
  const { appStore, teamStore, gamesStore } = props.rootStore;

  useEffect(() => {
    if (appStore.initialized) {
      const gameSlug = props.location.pathname.split('/')[1];

      if (!gamesStore.selectedGame) {
        const game = gamesStore.games.find(game => game.name === gameSlug);
        gamesStore.selectGame(game.id);
        teamStore.getTeamsDataByGameId();
      }
    }
  }, [appStore.initialized]);

  const Section = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    background: #20242e;
    background-size: cover;
    background-position: top center;
    background-repeat: no-repeat;
    overflow: hidden;
  `;

  const Table = styled.table``;

  const TableData = styled.td``;
  console.log(teamStore.teams);

  return (
    <Section>
      <Table>
        <tbody>
          <tr>
            <TableData>Teams</TableData>
          </tr>
          {teamStore.teams.map(teams => (
            <tr>
              <TableData>{teams.name}</TableData>
              <TableData>
                Recruiting: {teams.recruiting ? 'Yes' : 'No'}
              </TableData>
            </tr>
          ))}
        </tbody>
      </Table>
    </Section>
  );
};

export default inject('rootStore')(observer(ListTeams));
