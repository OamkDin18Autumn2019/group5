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

const Table = styled.table`
  display: flex;
  justify-content: left;
  flex-direction: column;
  font-family: Roboto, sans-serif;
  font-size: 20px;
  font-weight: 200;
  padding-left: 10px;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;

const TeamData = styled.div`
  color: #fff;
  height: 15px;
  font-size: 16px;
  border-bottom: 1px solid;
  padding: 10px;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
  &:hover {
    opacity: 0.5;
    transition: 0.1s ease;
  }
  @media (max-width: 700px) {
    width: 90%;
  }
`;

const SubTitle = styled.h1`
  display: flex;
  justify-content: center;
  margin: 10px 0 15px 0;
  font-weight: 200;
  font-size: 20px;
  text-align: center;
  color: #fff;
  @media (max-width: 700px) {
    text-align: left;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10px;
    font-size 18px;
  }
`;

const YourTeams = props => {
  const { appStore, profileStore, gamesStore } = props.rootStore;

  return (
    <>
      <Table>
        <SubTitle>Your teams</SubTitle>
        {profileStore.teams.map(team => (
          <StyledLink
            to={`/${
              gamesStore.games.find(game => game.id === team.gameId).name
            }/teams/${team.id}`}
          >
            <TeamData>{team.name}</TeamData>
          </StyledLink>
        ))}
      </Table>
    </>
  );
};

export default inject('rootStore')(observer(YourTeams));
