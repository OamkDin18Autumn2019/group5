import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import AddMemberBtn from './AddMemberBtn';

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

const Title = styled.h1`
  margin: 10px 0 20px 0;
  font-weight: 300;
  font-size: 28px;
  color: #fff;
  text-align: left;
  margin-bottom: 40px;
`;

const SubTitle = styled.h1`
  display: flex;
  justify-content: center;
  margin: 10px 0 15px 0;
  font-weight: 200;
  font-size: 20px;
  text-align: center;
  color: #fff;
`;

const Tbody = styled.tbody`
  background: #32353d;

  padding: 40px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 5%;
  font-family: Roboto, sans-serif;
  font-size: 16px;
`;

const MemberData = styled.div`
  color: #fff;
  height: 15px;
  border-bottom: 1px solid;
  padding: 10px;
`;

const TeamPage = props => {
  const { appStore, teamStore } = props.rootStore;

  const id = props.match.params.id;

  useEffect(() => {
    if (appStore.initialized) {
      teamStore.getTeamById(id);
      teamStore.selectTeam(id);
    }

    return () => teamStore.selectTeam(null);
  }, [appStore.initialized, teamStore.selectedTeamId]);

  return (
    teamStore.selectedTeam && (
      <Background>
        <Container>
          <Tbody>
            <Title>{teamStore.selectedTeam.name}</Title>
            <SubTitle>
              Team Members <AddMemberBtn></AddMemberBtn>
            </SubTitle>
            <>
              {teamStore.selectedTeam.players &&
                teamStore.selectedTeam.players.map(player => (
                  <MemberData key="players">{player.username}</MemberData>
                ))}
            </>
          </Tbody>
        </Container>
      </Background>
    )
  );
};

export default inject('rootStore')(observer(TeamPage));
