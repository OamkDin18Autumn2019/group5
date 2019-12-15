import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { Switch, Route, withRouter } from 'react-router';
import Home from './routes/Home';
import Auth from './routes/Auth';
import Alert from './components/Alert';
import Team from './routes/Team';
import Games from './routes/Games';

const App = observer(props => {
  const { alertStore, appStore } = props.rootStore;

  useEffect(() => {
    if (!appStore.initialized) appStore.init();
  }, [appStore.initialized]);

  return (
    <>
      {alertStore.isOpen && <Alert rootStore={props.rootStore} />}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/teams-page" component={Team} />
        <Route
          exact
          path="/counter-strike-global-offensive"
          render={props => (
            <Games {...props} game={'counter-strike-global-offensive'} />
          )}
        />
        <Route
          exact
          path="/league-of-legends"
          render={props => <Games {...props} game={'league-of-legends'} />}
        />
        <Route
          exact
          path="/dota-2"
          render={props => <Games {...props} game={'dota-2'} />}
        />
        <Route exact path="/register" component={Auth} />
        <Route exact path="/login" component={Auth} />
      </Switch>
    </>
  );
});

export default withRouter(inject('rootStore')(App));
