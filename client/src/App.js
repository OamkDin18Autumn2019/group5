import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { Switch, Route, withRouter } from 'react-router';
import Home from './routes/Home';
import NavBar from './routes/Home/NavBar';
import Team from './routes/Team';
import Auth from './routes/Auth';
import Alert from './components/Alert';
import ListTeams from './routes/ListTeams';
import Games from './routes/Games';
import TeamPage from './routes/Team/TeamPage';
import { BrowserRouter } from 'react-router-dom';
import Profile from './routes/Profile';

import styled from 'styled-components';

const StyledHome = styled.div`
  width: 100%;
  height: auto;
  color: #fff;
  font-family: Robot, Sans-serif;
`;

const Section = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: #20242e;
  // background-image: url(https://iem.imgix.net/season-13/katowice/wp-content/uploads/2018/07/20180303_helena-kristiansson_iem-katowice_04924-1.jpg?auto=format%2Ccompress&w=6720);
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
  overflow: hidden;
`;

const App = observer(props => {
  const { alertStore, appStore, gamesStore, profileStore } = props.rootStore;

  useEffect(() => {
    if (!appStore.initialized) appStore.init();
    if (appStore.accessToken && !profileStore.initialized) {
      profileStore.getProfileData();
    }
  }, [appStore.initialized, profileStore.invitations, appStore.accessToken]);

  return (
    <BrowserRouter>
      <StyledHome>
        <Section>
          <NavBar {...props} />
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
            <Route exact path="/profile-page" component={Profile} />
            <Route exact path="/register" component={Auth} />
            <Route exact path="/login" component={Auth} />
            <Route exact path="/create-team" component={Team} />
            {gamesStore.games.map(game => (
              <Route exact path={`/${game.name}/teams`} component={ListTeams} />
            ))}
            {gamesStore.games.map(game => (
              <Route path={`/${game.name}/teams/:id`} component={TeamPage} />
            ))}
          </Switch>
        </Section>
      </StyledHome>
    </BrowserRouter>
  );
});

export default withRouter(inject('rootStore')(App));
