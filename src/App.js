import React, { Component } from 'react';
import Waitlist from './Waitlist/Waitlist.js';
import WaitlistGuestForm from './WaitlistGuestForm/WaitlistGuestForm.js';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './App.scss';

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
    {id: 1, name: "Alex Oxrud", partySize: 3},
    {id: 2, name: "Oscar Waczynski", partySize: 2},
    {id: 3, name: "Elon Musk", partySize: 6},
    {id: 4, name: "Amara Grey Oxrud", partySize: 3},
  ]
});


class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <div className='App'>
        <Waitlist title="Waitlist"></Waitlist>
      </div>
      </Provider>
    );
  }
}

    //

    //     <WaitlistGuestForm title="Add"></WaitlistGuestForm>

export default App;
