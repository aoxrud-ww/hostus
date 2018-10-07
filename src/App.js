import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Waitlist from './components/Waitlist/Waitlist.js';
import AppHeader from './components/AppHeader/AppHeader.js';
import AddParty from './components/AddParty/AddParty.js';
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

          <Route exact path="/" component={Waitlist} />
          <Route path="/add-party" component={AddParty} />
        </div>
      </Router>
      </Provider>
    );
  }
}


export default App;
