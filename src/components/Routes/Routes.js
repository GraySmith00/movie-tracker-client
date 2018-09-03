import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../../containers/Login/Login';
import Register from '../../containers/Register/Register';
import CardContainer from '../../containers/CardContainer/CardContainer.js';

export const Routes = () => {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={() => {
          return <CardContainer category={'nowPlaying'} />;
        }}
      />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route
        exact
        path="/favorites"
        render={() => {
          return <CardContainer category={'favorites'} />;
        }}
      />
    </Switch>
  );
};

export default Routes;
