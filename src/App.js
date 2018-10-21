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
    {id: 1, name: "Alex Oxrud", partySize: 3, quoted: 5, phone: "8015601194", createdAt: Date.now(), note: "Notes from above.", status: "purple" },
    {id: 2, name: "Oscar Waczynski", partySize: 2, quoted: 2, createdAt: Date.now() - 1000*60, status: "blue"},
    {id: 3, name: "Elon Musk", partySize: 6, quoted: 15, createdAt: Date.now()- 1000*60*5, status: "orange"},
    {id: 4, name: "Amara Grey Oxrud", partySize: 3, quoted: 10, createdAt: Date.now() - 1000*60*14, status: "red"}
  ],
  frequentlyUsedTags: [
    {
      label: "Bar"
    },
    {
      label: "Outside"
    },
    {
      label: "Table"
    },
    {
      label: "Booth"
    },
    {
      label: "Inside"
    }
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
