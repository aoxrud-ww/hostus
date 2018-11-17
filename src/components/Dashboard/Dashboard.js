import React, { Component } from 'react';
import styles from './Dashboard.module.scss';
import Waitlist from '../Waitlist/Waitlist.js';
import WaitlistStats from '../WaitlistStats/WaitlistStats.js';
import CreateVisit from '../CreateVisit/CreateVisit.js';

class Dashboard extends Component {

  render() {
    return (
      <div className={styles.container}>
        <Waitlist history={this.props.history} />
      </div>
    );
  }
}



export default Dashboard;
