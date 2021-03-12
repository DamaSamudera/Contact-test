import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader/root';
import { Router } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import AppContextProvider from './contexts';
import PageBase from './components/PageBase';
import pages from './pages';

const App = ({ history, store }) => (
  <Provider store={store}>
    <Router history={history}>
      <AppContextProvider>
        <Switch>
          <PageBase>
            <Route component={pages.Create} exact path="/create" />
            <Route component={pages.Home} exact path="/" />
          </PageBase>
          <Route component={pages.Error404} />
        </Switch>
      </AppContextProvider>
    </Router>
  </Provider>
);

export default hot(App);

App.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};
