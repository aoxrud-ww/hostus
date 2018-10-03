import React, { Component } from 'react';
import Waitlist from './Waitlist/Waitlist.js';


import './App.scss';

class App extends Component {
  constructor() {
    super();
    this.state = {
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
    };
  }

  render() {
    return (
      <div className='App'>
        <Waitlist list={this.state.list} title="Waitlist"></Waitlist>
      </div>
    );
  }
}

export default App;
