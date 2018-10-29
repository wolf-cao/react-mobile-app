import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Switch } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import App from './views/App'
import AppRoutes from './views/routes'
import './views/App.css'

const history = createBrowserHistory()

const GlobalRoutes = AppRoutes.map((item, index) => (
  <Route path={item.path} exact component={item.component} key={index} />
))

ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route path="/ReactMobileH5" exact component={App} />
      {GlobalRoutes}
    </Switch>
  </Router>,
  document.getElementById('App')
)
