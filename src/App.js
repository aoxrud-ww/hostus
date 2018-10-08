import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import * as routes from './routes.js';

import Waitlist from './components/Waitlist/Waitlist.js';
import AppHeader from './components/AppHeader/AppHeader.js';
import CreateVisit from './components/CreateVisit/CreateVisit.js';
import CustomerProfile from './components/CustomerProfile/CustomerProfile.js';

import reducer from './reducers';
import './App.scss';

const store = createStore(reducer, {
  list: [
    {id: 1, name: "Alex Oxrud", partySize: 3, quoted: 5, phone: "8015601194", createdAt: Date.now(), note: "Notes hello from hell"},
    {id: 2, name: "Oscar Waczynski", partySize: 2, quoted: 5, createdAt: Date.now() - 250000},
    {id: 3, name: "Elon Musk", partySize: 6, quoted: 15, createdAt: Date.now()- 60000},
    {id: 4, name: "Amara Grey Oxrud", partySize: 3, quoted: 1, createdAt: Date.now() - 3123430}
  ]
});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
        <div className='App'>
          <AppHeader />

          <Route exact path={routes.HOME} component={Waitlist} />
          <Route path={routes.ADD_GUEST} component={CreateVisit} />
          <Route path={routes.CUSTOMER_PROFILE} component={CustomerProfile} />
        </div>
      </Router>
      </Provider>
    );
  }
}


export default App;
