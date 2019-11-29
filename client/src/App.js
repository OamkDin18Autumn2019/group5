import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { Switch, Route, withRouter } from 'react-router';
import Home from './routes/Home';
import Team from './routes/Team';

const App = props => {
  const { appStore } = props.rootStore;

  useEffect(() => {
    if (!appStore.initialized) appStore.init();
  }, [appStore.initialized]);

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/register-team" component={Team} />
    </Switch>
  );
};

export default withRouter(inject('rootStore')(observer(App)));
