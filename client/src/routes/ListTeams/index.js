import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
    position: relative;
    background: #20242e;
    background-size: cover;
    background-position: top center;
    background-repeat: no-repeat;
    font-family: Roboto, sans-serif;
  `;
  const Title = styled.h1`
    margin: 0;
    font-weight: 300;
    font-size: 28px;
    color: #fff;
    text-align: left;
    margin-bottom: 10px;
    margin-top: 20px;
  `;

  const Container = styled.div`
    display: flex;
    justify-content: center;
  `;

  const BlockDiv = styled.div`
    margin-bottom: 5px;
  `;

  const Tbody = styled.div`
    width: 50%;
  `;

  const StyledLink = styled(Link)`
    text-decoration: none;
    widht: 100%;
    border: none;
    color: #fff;
    font-family: Roboto, sans-serif;
    font-weight: 300;
    cursor: pointer;
    padding: 0;
    margin: 10px;
    margin-bottom: 0;
  `;

  const Table = styled.div`
    display: flex;
    justify-content: left;
    font-family: Roboto, sans-serif;
    font-size: 20px;
    font-weight: 200;
    padding-left: 10px;
  `;

  const TeamData = styled.div`
    color: #fff;
    height: 15px;
    border-bottom: 1px solid;
    padding: 10px;
  `;
  console.log(teamStore.teams);

  return (
    <Section>
      <Container>
        <Tbody>
          <Title>Teams for CSGO</Title>
          {teamStore.teams.map(team => (
            <StyledLink
              to={`/${gamesStore.selectedGame.name}/teams/${team.id}`}
            >
              <BlockDiv>
                <Table>{team.name}</Table>
                <TeamData>
                  Recruiting: {team.recruiting ? 'Yes' : 'No'}
                </TeamData>
              </BlockDiv>
            </StyledLink>
          ))}
        </Tbody>
      </Container>
    </Section>
  );
};

export default inject('rootStore')(observer(ListTeams));
