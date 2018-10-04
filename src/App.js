import React, { Component } from 'react';
import Waitlist from './Waitlist/Waitlist.js';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './App.scss';

const store = createStore((state, action) => {
  console.log(state, action);

  if(action.type === 'delete') {

    let indexToDelete = {};
    state.list.forEach((group, groupIndex) => {
      group.list.forEach((item, listIndex) => {
        if(item === action.item) {
          indexToDelete.group = groupIndex;
          indexToDelete.item = listIndex;
        }
      })
    });

    const list = [...state.list];
    list[indexToDelete.group].list.splice(indexToDelete.item, 1);
    return {...state, list};
  }

  return state;
}, {
  list: [
    {
      groupName: "Now",
      list: [
        {id: 1, name: "Alex Oxrud", partySize: 3},
        {id: 2, name: "Oscar Waczynski", partySize: 2}
      ]
    },
    {
      groupName: "3:00pm",
      list: [
        {id: 1, name: "Elon Musk", partySize: 6},
        {id: 2, name: "Amara Grey Oxrud", partySize: 3}
      ]
    }
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

export default App;
