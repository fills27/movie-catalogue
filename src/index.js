import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, Switch} from 'react-router-dom'
import {Home, Detail, Search} from 'pages'
import { Provider } from 'react-redux'
import {Routes} from 'utils'
import {store, actions} from 'stores'
import { createBrowserHistory } from 'history'

import './index.css'
import './line.awesome.css'

const history = createBrowserHistory()

store.dispatch(actions.getData())

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path={Routes.ROOT} component={Home} />
        <Route exact path={Routes.SHOW.DETAIL} component={Detail} />
        <Route exact path={Routes.SEARCH} component={Search} />
      </Switch>
    </Router>
  </Provider>, document.getElementById('app')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
