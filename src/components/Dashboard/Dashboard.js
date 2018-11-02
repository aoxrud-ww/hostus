import React, { Component } from 'react';
import styles from './Dashboard.module.scss';
import Waitlist from '../Waitlist/Waitlist.js';
import WaitlistStats from '../WaitlistStats/WaitlistStats.js';
import CreateVisit from '../CreateVisit/CreateVisit.js';

class Dashboard extends Component {

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.waitlist}>
          <Waitlist history={this.props.history} />
        </div>

        <div className={styles.sidebar}>
          <div className={styles.stats}>
            <WaitlistStats className={styles.stats} />
          </div>
          <div className={styles.stats}>
            <CreateVisit history={this.props.history} />
          </div>
        </div>

      </div>
    );
  }
}

export default Dashboard;
