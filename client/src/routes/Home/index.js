import React from 'react';
import { inject, observer } from 'mobx-react';

const Home = props => {
  const { appStore } = props.rootStore;

  return (
    <div>
      <h1>E-SPORTS</h1>
    </div>
  );
};

export default inject('rootStore')(observer(Home));
