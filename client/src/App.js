import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { Switch, Route, withRouter } from 'react-router';
import Home from './routes/Home';
import Auth from './routes/Auth';
import Alert from './components/Alert';

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
        <Route exact path="/register" component={Auth} />
        <Route exact path="/login" component={Auth} />
      </Switch>
    </>
  );
});

export default withRouter(inject('rootStore')(App));
