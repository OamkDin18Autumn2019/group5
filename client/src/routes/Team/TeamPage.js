import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

const Background = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: #20242e;
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
  overflow: hidden;
  font-family: Roboto, sans-serif;
`;

const MainStyle = styled.div`
  position: relative;
  margin: 15% auto;
  display: flex;
  width: 300px;
  height: 330px;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 10px rgb(0, 0, 0);
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  padding: 40px;
  width: 300px;
  height: 300px;
`;

const Title = styled.h1`
  margin: 10px 0 20px 0;
  font-weight: 300;
  font-size: 28px;
  color: #20242e;
`;

const TeamPage = props => {
  const { teamStore } = props.rootStore;

  const id = props.match.params.id;

  const getTeamById = async () => {
    await teamStore.getTeamById(id);
  };

  if (!teamStore.reload) {
    setTimeout(() => getTeamById(), 1);
  }

  return (
    <Background>
      <MainStyle>
        <Container>
          <Title>Team page</Title>
          <p>TEAM NAME: {teamStore.teamData.name}</p>
          <p>TEAM ID:{teamStore.teamData.id}</p>
          <div>
            PLAYERS:{' '}
            {teamStore.teamData.players &&
              teamStore.teamData.players.map(player => (
                <p key="players">{player.username}</p>
              ))}
          </div>
        </Container>
      </MainStyle>
    </Background>
  );
};

export default inject('rootStore')(observer(TeamPage));
