import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import * as routes from '../../routes.js';

import Dashboard from '../Dashboard/Dashboard.js';
import AppHeader from '../AppHeader/AppHeader.js';
import CreateVisit from '../CreateVisit/CreateVisit.js';
import CustomerProfile from '../CustomerProfile/CustomerProfile.js';

import reducer from '../../reducers';
import './App.scss';

const store = createStore(reducer, {
  user: {
    name: "Coffee & Co"
  },
  list: [
    {id: 1, name: "Alex", partySize: 3, quoted: 5, phone: "8015601194", createdAt: Date.now(), note: "Notes from above.", tags: ["Bar"] },
    {id: 2, name: "Oscar", partySize: 2, quoted: 2, createdAt: Date.now() - 1000*60, tags: ["Booth", "Inside"]},
    {id: 3, name: "Elon", partySize: 6, quoted: 15, createdAt: Date.now()- 1000*60*5, tags: ["Outside"]},
    {id: 4, name: "Amara", partySize: 3, quoted: 10, createdAt: Date.now() - 1000*60*14, tags: []},
    {id: 5, name: "Kivanc", partySize: 3, quoted: 5, phone: "8015601194", createdAt: Date.now(), note: "Notes from above.", tags: ["Bar"] },
    {id: 6, name: "Ricky", partySize: 2, quoted: 2, createdAt: Date.now() - 1000*60, tags: ["Booth", "Inside"]},
    {id: 7, name: "Nate", partySize: 6, quoted: 15, createdAt: Date.now()- 1000*60*5, tags: ["Outside"]},
    {id: 8, name: "Josh", partySize: 3, quoted: 10, createdAt: Date.now() - 1000*60*7, tags: []},
    {id: 9, name: "Beno", partySize: 3, quoted: 10, createdAt: Date.now() - 1000*60*6, tags: []},
    {id: 10, name: "William", partySize: 3, quoted: 10, createdAt: Date.now() - 1000*60*2, tags: []}
  ],
  tagUsage: {
    "Bar": 0,
    "Outside": 0,
    "Table": 0,
    "Booth": 0,
    "Inside": 0
  },
  tags: [
    "Booth",
    "High Top",
    "High Chair",
    "Table",
    "Vegetarian",
    "Allergy",
    "VIP"
  ],
  waitTimes: [
    {label: "1 - 2", min: 1, max: 2, value: 0},
    {label: "3 - 4", min: 3, max: 4, value: 0},
    {label: "5 - 6", min: 5, max: 6, value: 5},
    {label: "7+", min: 7, value: 10}
  ]

});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Router>
      <div className='App'>
        <AppHeader />
        <Route exact path={routes.HOME} component={Dashboard} />
        <Route path={routes.ADD_GUEST} component={CreateVisit} />
        <Route path={routes.CUSTOMER_PROFILE} component={CustomerProfile} />
      </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
