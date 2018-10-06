import React, { Component } from 'react';
import styles from './WaitlistStats.module.scss';

class WaitlistStats extends Component {

  render() {
    return (
      <div className={styles.container}>
        <ul>
          <li>
            <span className={styles.value}>
              2 groups
              3 people
            </span>
            <span className={styles.label}>Waiting</span>
          </li>

          <li>
            <span className={styles.value}>
              2 groups
              3 people
            </span>
            <span className={styles.label}>Served</span>
          </li>
        </ul>
      </div>
    );
  }
}

export default WaitlistStats;
