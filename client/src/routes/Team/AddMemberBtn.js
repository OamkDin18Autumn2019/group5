import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

const Container = styled.div`
  width: 650px;
  font-family: 'Roboto', sans-serif;
`;

const EmptyDiv = styled.div`
  margin-left: 650px;
`;

const Input = styled.input`
  display: block;
  box-sizing: border-box;
  margin-bottom: 20px;
  padding: 4px;
  width: 150px;
  height: 26px;
  border: none;
  border-bottom: 1px solid #20242e;
  font-weight: 400;
  font-size: 16px;
  margin-top: 5px;
  margin-left: 500px;
  transition: 0.2s ease;
  &:focus {
    border-bottom: 2px solid #636363;
    color: #20242e;
    transition: 0.2s ease;
    outline: none;
  }
`;

const AddButton = styled.button`
  text-decoration: none;
  width: 150px;
  height: 25px;
  font-size: 16px;
  background: #7de88c;
  border: none;
  color: #fff;
  font-weight: 650;
  text-transform: uppercase;
  transition: 0.1s ease;
  cursor: pointer;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
  padding: 0;
  margin: 0;
  margin-top: 0px;
  margin-left: 500px;
  margin-bottom: 0;
  &:hover,
  &:focus {
    opacity: 0.8;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    transition: 0.1s ease;
  }
  &:active {
    opacity: 1;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
    transition: 0.1s ease;
  }
`;

const AddMemberBtn = props => {
  const { teamStore } = props.rootStore;

  const [username, setUsername] = useState('');

  const [teamId, setTeamId] = useState(teamStore.selectedTeamId);

  const changeUsername = e => {
    setUsername(e.target.value);
  };

  const invitePlayer = async () => {
    await teamStore.invitePlayer(username, teamId);
    setUsername('');
    setTeamId(teamStore.selectedTeamId);
  };

  return (
    <>
      {teamStore.selectedTeam.canInvitePlayers ? (
        <Container>
          <AddButton onClick={invitePlayer}>+ Add Member</AddButton>
          <Input
            type="text"
            value={username}
            onChange={changeUsername}
            placeholder="Search for players"
          />
        </Container>
      ) : (
        <EmptyDiv></EmptyDiv>
      )}
    </>
  );
};

export default inject('rootStore')(observer(AddMemberBtn));
