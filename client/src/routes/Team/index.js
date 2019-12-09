import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import './index.module.css';
import StyledForm from './StyledForm';

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

const Team = props => {
  return (
    <>
      {props.location.pathname === '/register-team' ? (
        <MainStyle>
          <Container>
            <Title>Register a Team</Title>
            <StyledForm />
          </Container>
        </MainStyle>
      ) : (
        ''
      )}
    </>
  );
};

export default inject('rootStore')(observer(Team));
