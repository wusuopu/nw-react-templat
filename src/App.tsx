import React from 'react';
import {Provider} from 'react-redux';
import {ThemeProvider} from 'styled-components';
import { PersistGate } from 'redux-persist/lib/integration/react'
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { getPersistor } from '@rematch/persist'

import Loading from './containers/loading';
import HomePage from './containers/home-page'

import store from './store';
import Config from './config';
import theme from './theme'
import nw from "./lib/nw";

class NotFoundPage extends React.PureComponent {
  render() {
    return null
  }
}

const persistor = getPersistor()

export default class App extends React.PureComponent{
  async componentDidMount () {
    if (process.env.NODE_ENV === 'development' && Config.IS_NW) {
      let win = nw?.Window?.get()
      win.show()
      win.showDevTools()
    }
  }
  render () {
    return (
      <HelmetProvider>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <PersistGate persistor={persistor}>
              <React.Fragment>
                <Router>
                  <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route component={NotFoundPage} />
                  </Switch>
                </Router>
                <Loading />
              </React.Fragment>
            </PersistGate>
          </ThemeProvider>
        </Provider>
      </HelmetProvider>
    );
  }
}
