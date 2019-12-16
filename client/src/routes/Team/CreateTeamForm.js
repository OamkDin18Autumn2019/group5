import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';

const Input = styled.input`
  display: block;
  box-sizing: border-box;
  margin-bottom: 10px;
  padding: 4px;
  width: 220px;
  height: 32px;
  border: none;
  border-bottom: 1px solid #aaa;
  font-weight: 400;
  font-size: 16px;
  transition: 0.2s ease;
  &:focus {
    border-bottom: 2px solid #20242e;
    color: #20242e;
    transition: 0.2s ease;
  }
`;

const Select = styled.select`
  font-weight: 300;
  font-size: 16px;
  color: #20242e;
  width: 220px;
`;

const Option = styled.option`
  font-weight: 300;
  font-size: 16px;
  color: #20242e;
  width: 220px;
`;

const SubmitButton = styled.button`
  text-decoration: none;
  width: 220px;
  height: 40px;
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
  margin-top: 10px;
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

const CreateTeamForm = props => {
  const { appStore, teamStore } = props.rootStore;

  const [name, setName] = useState('');
  const [gameId, setGameId] = useState('1');

  const changeName = e => {
    setName(e.target.value);
  };

  const optionId = e => {
    const index = e.target.selectedIndex;
    const optionElement = e.target.childNodes[index];
    const option = optionElement.getAttribute('id');
    setGameId(option);
  };

  const registerTeam = async () => {
    await teamStore.registerTeam(name, gameId);
    setName('');
    setGameId('');
  };

  return (
    <>
      <Input
        type="text"
        value={name}
        onChange={changeName}
        placeholder="Team name"
      />
      <Select onChange={optionId}>
        <Option label="CS:GO" value={gameId} id="1">
          CS:GO
        </Option>
        <Option lable="Dota 2" value={gameId} id="2">
          Dota 2
        </Option>
        <Option lable="League of Legends" value={gameId} id="3">
          League of Legends
        </Option>
      </Select>
      <SubmitButton onClick={registerTeam}>Register</SubmitButton>
    </>
  );
};

export default inject('rootStore')(observer(CreateTeamForm));
