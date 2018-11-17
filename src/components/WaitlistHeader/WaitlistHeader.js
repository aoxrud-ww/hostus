import React, { Component } from 'react';
import styles from './WaitlistHeader.module.scss';

class WaitlistHeader extends Component {

  render() {
    return (
      <div className={styles.heading}>
        <div className={styles.partySize}>#</div>
        <div className={styles.name}>Name</div>
        <div className={styles.tags}>Tags</div>
        <div className={styles.waiting}>Waiting</div>
        <div className={styles.quoted}>Quoted</div>
      </div>
    );
  }
}

export default WaitlistHeader;
