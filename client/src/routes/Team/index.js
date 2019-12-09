import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
// import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import './index.module.css';

const Team = props => {
  const { appStore, teamStore } = props.rootStore;

  const MainStyle = styled.div`
    position: relative;
    margin: 15% auto;
    display: flex;
    width: 300px;
    height: 350px;
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
    height: 400px;
  `;

  const Title = styled.h1`
    margin: 10px 0 20px 0;
    font-weight: 300;
    font-size: 28px;
    color: #20242e;
  `;

  const Select = styled.select`
    font-weight: 300;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    color: #20242e;
    width: 220px;
  `;

  const Option = styled.option`
    font-weight: 300;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    color: #20242e;
    width: 220px;
  `;

  const Input = styled.input`
    display: block;
    box-sizing: border-box;
    margin-bottom: 20px;
    padding: 4px;
    width: 220px;
    height: 32px;
    border: none;
    border-bottom: 1px solid #aaa;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 16px;
    transition: 0.2s ease;
    &:focus {
      border-bottom: 2px solid #20242e;
      color: #20242e;
      transition: 0.2s ease;
    }
  `;

  const Button = styled.button`
    text-decoration: none;
    width: 220px;
    height: 40px;
    font-size: 16px;
    background: #7de88c;
    border: none;
    color: #fff;
    font-family: Roboto, sans-serif;
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

  const [name, setName] = useState('');
  const [gameId, setGameId] = useState('1');

  const changeName = e => {
    setName(e.target.value);
  };

  console.log(name, setName);

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

  const getTeam = async () => {
    await teamStore.getTeam();
  };

  const action =
    props.location.pathname === '/register-team' ? registerTeam : getTeam;
  const actionName =
    props.location.pathname === '/register-team' ? 'Register team' : '';

  return (
    <>
      {props.location.pathname === '/register-team' ? (
        <MainStyle>
          <Container>
            <Title>Register a Team</Title>
            <Input
              autoFocus={true}
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
            <Button onClick={action}>{actionName}</Button>
          </Container>
        </MainStyle>
      ) : (
        ''
      )}
    </>
  );
};

export default inject('rootStore')(observer(Team));
