import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import style from './index.module.css';
const Auth = props => {
  const { appStore, authStore } = props.rootStore;

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const changeUsername = e => {
    setUsername(e.target.value);
  };

  const changeEmail = e => {
    setEmail(e.target.value);
  };

  const changePassword = e => {
    setPassword(e.target.value);
  };

  const changePasswordConfirmation = e => {
    setPasswordConfirmation(e.target.value);
  };

  const login = async () => {
    await authStore.fetchToken(username, password);
    setUsername('');
    setPassword('');
  };

  const register = async () => {
    await authStore.register(username, email, password, passwordConfirmation);
    setUsername('');
    setEmail('');
    setPassword('');
    setPasswordConfirmation('');
  };

  if (appStore.accessToken) {
    return <Redirect to="/" />;
  }

  const action = props.location.pathname === '/register' ? register : login;
  const actionName =
    props.location.pathname === '/register' ? 'sign me up' : 'Login';

  return (
    <>
      {props.location.pathname === '/register' ? (
        <div className={style.registerBox}>
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
              type="password"
              value={password}
              onChange={changePassword}
              placeholder="Password"
            />
            <input
              className={style.password}
              type="password"
              value={passwordConfirmation}
              onChange={changePasswordConfirmation}
              placeholder="Retype password"
            />
            <button className={style.submitBtn} onClick={action}>
              {actionName}
            </button>
          </div>
        </div>
      ) : (
        <div className={style.loginBox}>
          <div className={style.container}>
            <div>
              <h1>Login</h1>
              <input
                className={style.userInfo}
                type="text"
                value={username}
                onChange={changeUsername}
                placeholder="Username or Email"
              />
              <input
                className={style.password}
                type="password"
                value={password}
                onChange={changePassword}
                placeholder="Password"
              />
              <button className={style.submitBtn} onClick={action}>
                {actionName}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default inject('rootStore')(observer(Auth));
