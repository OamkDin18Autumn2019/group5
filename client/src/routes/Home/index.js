import React from 'react';
import { inject, observer } from 'mobx-react';

import GameList from './GameList';

const Home = props => {
  const { appStore } = props.rootStore;

  return <>{appStore.authenticated ? <GameList /> : <GameList />}</>;
};

export default inject('rootStore')(observer(Home));
