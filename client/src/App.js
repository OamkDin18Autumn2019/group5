import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { Switch, Route, withRouter } from 'react-router';
import Home from './routes/Home';
import Alert from './components/Alert';

const App = observer(props => {
  const { alertStore, appStore } = props.rootStore;

  useEffect(() => {
    if (!appStore.initialized) appStore.init();
  }, [appStore.initialized]);

  return (
    <>
      {alertStore.open && <Alert rootStore={props.rootStore} />}
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </>
  );
});

export default withRouter(inject('rootStore')(App));
