import React from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
  text-decoration: none;
  width: 100%;
  border: none;
  color: #fff;
  font-family: Roboto, sans-serif;
  font-weight: 300;
  cursor: pointer;
  padding: 0;
  margin: 10px;
  margin-bottom: 0;
`;

const YourTeams = props => {
  const { appStore, profileStore, gamesStore } = props.rootStore;

  const Table = styled.table``;

  return (
    <div>
      <Table>
        <tr>
          <th>Your teams</th>
        </tr>
        {profileStore.teams.map(team => (
          <tr>
            <StyledLink
              to={`/${
                gamesStore.games.find(game => game.id === team.gameId).name
              }/teams/${team.id}`}
            >
              <td>{team.name}</td>
            </StyledLink>
          </tr>
        ))}
      </Table>
    </div>
  );
};

export default inject('rootStore')(observer(YourTeams));
