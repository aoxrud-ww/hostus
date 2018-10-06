import React, { Component } from 'react';
import Waitlist from './Waitlist/Waitlist.js';
import AppHeader from './AppHeader/AppHeader.js';
import AddParty from './AddParty/AddParty.js';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './App.scss';


import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


const store = createStore((state, action) => {
  console.log(state, action);

  if(action.type === 'delete') {
    const list = state.list.filter(item => item !== action.item);
    return {...state, list };
  }

  if(action.type === 'add') {
    const list = [...state.list];
    action.item.id = Date.now();
    console.log(action);
    list[0].list.push(action.item);
    return {...state, list};
  }

  return state;
}, {
  list: [
    {id: 1, name: "Alex Oxrud", partySize: 3, quoted: 5, createdAt: Date.now(), note: "Notes hello from hell"},
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

    //

    //     <WaitlistGuestForm title="Add"></WaitlistGuestForm>

export default App;
