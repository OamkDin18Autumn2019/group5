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

const MainTitle = styled.h1`
  width: 100%;
  heigth: 37px;
  cursor: pointer;
  text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000,
    2px 2px 0 #000;
  text-align: center;
  color: #fff;
  display: inline-block !important;
  align-items: center;
  &:hover {
    opacity: 0.8;
    transition: 0.1s ease;
  }
  @media (max-width: 700px) {
    display: block;
    width: 250px;
    align-items: center;
  }
`;

const Title = styled.h1`
  margin: 10px 0 20px 0;
  font-weight: 300;
  font-size: 28px;
  color: #fff;
  text-align: left;
  margin-bottom: 40px;
  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
    align-items: left;
    margin-bottom: 10px;
    font-size 24px;
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
    margin-bottom: 10px;
    font-size 18px;
  }
`;

const Tbody = styled.tbody`
  background: #32353d;
  padding: 40px;
  @media (max-width: 700px) {
    display: flex;
    font-size: 14px;
    flex-direction: column;
    align-items: left;
    padding: 15px;
    width: 80%;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 1%;
  font-family: Roboto, sans-serif;
  font-size: 16px;
`;

const MemberData = styled.div`
  color: #fff;
  height: 15px;
  border-bottom: 1px solid;
  padding: 10px;
  @media (max-width: 700px) {
  }
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
        <MainTitle
          onClick={() => {
            props.history.push('/');
          }}
        >
          Global E-sports
        </MainTitle>
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
