import React, { Component } from 'react';
import WaitlistGroup from '../WaitlistGroup/WaitlistGroup.js';
import styles from './Waitlist.module.scss';

class Waitlist extends Component {
  render() {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>{this.props.title}</h1>
        </header>
        <ul className={styles.list}>
          {this.props.list.map(row =>
            (<WaitlistGroup key={row.groupName} header={row.groupName} items={row.list} />)
          )}
        </ul>
      </div>
    );
  }
}

export default Waitlist;
