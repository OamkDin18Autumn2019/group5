import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
// import { Redirect } from 'react-router-dom';
import style from './index.module.css';

const Team = props => {
  const { appStore, teamStore } = props.rootStore;

  const [name, setName] = useState('');
  const [gameId, setGameId] = useState('');

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
        <div className={style.registerBox}>
          <div className={style.container}>
            <h1>Register a Team</h1>
            <input
              className={style.userInfo}
              type="text"
              value={name}
              onChange={changeName}
              placeholder="Team name"
            />
            <select onChange={optionId}>
              <option label="CS:GO" value={gameId} id="1">
                CS:GO
              </option>
              <option lable="Dota 2" value={gameId} id="2">
                Dota 2
              </option>
              <option lable="League of Legends" value={gameId} id="3">
                League of Legends
              </option>
            </select>
            <button className={style.submitBtn} onClick={action}>
              {actionName}
            </button>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default inject('rootStore')(observer(Team));
