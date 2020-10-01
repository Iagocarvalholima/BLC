import React from 'react';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Transfer from '../pages/Transfer';
import Home from '../pages/Home';
import NotFound from './Notfound';
import {history} from '../history';
import PrivateRoute from '../components/PrivateRoute/index';
const { Router, Switch, Route } = require("react-router");


const Routes = () => (
  <Router history={history}>
    <Switch>
      <Route component={Login} exact path="/login"/>
      <Route component={Transfer} exact path="/transfer"/>
      <Route component={Register} exact path="/register"/>
      <PrivateRoute component={Home} exact path="/"/>
      {/* <Route component={NotFound}/> */}
    </Switch>
  </Router>
)
export default Routes;