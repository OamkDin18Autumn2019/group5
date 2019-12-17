import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { Switch, Route, withRouter } from 'react-router';
import Home from './routes/Home';
import Team from './routes/Team';
import Auth from './routes/Auth';
import Alert from './components/Alert';
import ListTeams from './routes/ListTeams';
import Games from './routes/Games';
import TeamPage from './routes/Team/TeamPage';
import { BrowserRouter } from 'react-router-dom';

const App = observer(props => {
  const { alertStore, appStore, gamesStore } = props.rootStore;

  useEffect(() => {
    if (!appStore.initialized) appStore.init();
  }, [appStore.initialized]);

  return (
    <BrowserRouter>
      {alertStore.isOpen && <Alert rootStore={props.rootStore} />}
      <Switch>
        <Route exact path="/" component={Home} />
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
        <Route exact path="/create-team" component={Team} />
        <Route exact path="/team-page/:id" component={TeamPage} />
        {gamesStore.games.map(game => (
          <Route path={`/${game.name}/teams`} component={ListTeams} />
        ))}
      </Switch>
    </BrowserRouter>
  );
});

export default withRouter(inject('rootStore')(App));
