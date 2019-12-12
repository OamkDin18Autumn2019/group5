import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';

const Section = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  font-family: 'Roboto', sans-serif;
  background: #20242e;
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
  overflow: hidden;
`;

const Title = styled.h1`
  margin: 10px 0 20px 0;
  font-weight: 300;
  font-size: 28px;
  color: #20242e;
`;

const LoginStyle = styled.div`
  position: relative;
  display: flex;
  margin: 15% auto;
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

const Input = styled.input`
  display: block;
  box-sizing: border-box;
  margin-bottom: 20px;
  padding: 4px;
  width: 220px;
  height: 32px;
  border: none;
  border-bottom: 1px solid #20242e;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 15px;
  transition: 0.2s ease;
  &:focus {
    border-bottom: 2px solid #636363;
    color: #20242e;
    transition: 0.2s ease;
    outline: none;
  }
`;

const Button = styled.button`
  margin-top: 10px;
  width: 220px;
  height: 32px;
  background: #636363;
  border: none;
  border-radius: 2px;
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  text-transform: uppercase;
  transition: 0.1s ease;
  cursor: pointer;
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

const LoginForm = props => {
  const { authStore } = props.rootStore;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const changeUsername = e => {
    setUsername(e.target.value);
  };

  const changePassword = e => {
    setPassword(e.target.value);
  };

  const login = async () => {
    await authStore.fetchToken(username, password);
    setUsername('');
    setPassword('');
  };

  return (
    <>
      <Section>
        <LoginStyle>
          <Container>
            <div>
              <Title>Login</Title>
              <Input
                type="text"
                value={username}
                onChange={changeUsername}
                placeholder="Username or Email"
              />
              <Input
                type="password"
                value={password}
                onChange={changePassword}
                placeholder="Password"
              />
              <Button onClick={login}>Login</Button>
            </div>
          </Container>
        </LoginStyle>
      </Section>
    </>
  );
};

export default inject('rootStore')(observer(LoginForm));
