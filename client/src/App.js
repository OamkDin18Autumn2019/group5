import React, { useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import { Switch, Route, withRouter } from 'react-router'
import Home from './routes/Home'
import Auth from './routes/Auth'

const App = props => {
  const { appStore } = props.rootStore

  useEffect(() => {
    if (!appStore.initialized) appStore.init()
  }, [appStore.initialized])

  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/login' component={Auth} />
      <Route path='/register' component={Auth} />
    </Switch>
  )
}

export default withRouter(inject('rootStore')(observer(App)))
