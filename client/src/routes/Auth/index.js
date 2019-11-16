import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import style from './index.module.css';
const Auth = props => {
  const { appStore, authStore } = props.rootStore;

  const [username, setUsername] = useState('');
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const changeUsername = e => {
    setUsername(e.target.value);
  };

  const changeEmail = e => {
    setEmail(e.target.value);
  };

  const changeUsernameOrEmail = e => {
    setUsernameOrEmail(e.target.value);
  };

  const changePassword = e => {
    setPassword(e.target.value);
  };

  const changePasswordConfirmation = e => {
    setPasswordConfirmation(e.target.value);
  };

  const login = async () => {
    await authStore.fetchToken(usernameOrEmail, password);
    setUsername('');
    setPassword('');
  };

  const register = async () => {
    await authStore.register(username, email, password, passwordConfirmation);
    setUsername('');
    setPassword('');
  };

  if (appStore.authenticated) {
    return <Redirect to="/" />;
  }

  const action = props.location.pathname === '/login' ? login : register;
  const actionName =
    props.location.pathname === '/login' ? 'Login' : 'Sign me up';

  return (
    <>
      <div className={style.loginBox}>
        <div className={style.container}>
          <h1>Sign up</h1>
          <input
            className={style.userInfo}
            type="text"
            value={username}
            onChange={changeUsername}
            placeholder="Username"
          />
          <input
            className={style.userInfo}
            type="text"
            value={email}
            onChange={changeEmail}
            placeholder="E-mail"
          />
          <input
            className={style.password}
            type="text"
            value={password}
            onChange={changePassword}
            placeholder="Password"
          />
          <input
            className={style.password}
            type="text"
            value={passwordConfirmation}
            onChange={changePasswordConfirmation}
            placeholder="Retype password"
          />
          <button className={style.submitBtn} onClick={action}>
            {actionName}
          </button>
        </div>
      </div>
    </>
  );
};

export default inject('rootStore')(observer(Auth));
