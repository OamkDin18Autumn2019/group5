import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

const Auth = props => {
  const { appStore, authStore } = props.rootStore;

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

  const register = async () => {
    await authStore.register(username, password);
    setUsername('');
    setPassword('');
  };

  if (appStore.authenticated) {
    return <Redirect to="/" />;
  }

  const action = props.location.pathname === '/login' ? login : register;
  const actionName =
    props.location.pathname === '/login' ? 'Login' : 'Register';

  return (
    <>
      <input type="text" value={username} onChange={changeUsername} />
      <input type="password" value={password} onChange={changePassword} />
      <button onClick={action}>{actionName}</button>
    </>
  );
};

export default inject('rootStore')(observer(Auth));
