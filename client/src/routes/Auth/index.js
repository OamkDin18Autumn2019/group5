import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import RegisterFrom from './RegisterFrom';
import LoginForm from './LoginForm';

const Section = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: #20242e;
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
  overflow: hidden;
`;

const Auth = props => {
  const { appStore, authStore } = props.rootStore;

  if (appStore.accessToken) {
    return <Redirect to="/" />;
  }

  return (
    <>
      {props.location.pathname === '/register' ? (
        <Section>
          <RegisterFrom />
        </Section>
      ) : (
        <Section>
          <LoginForm />
        </Section>
      )}
    </>
  );
};

export default inject('rootStore')(observer(Auth));
