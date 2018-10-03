import React, { Component } from 'react';
import WaitlistItem from '../WaitlistItem/WaitlistItem.js';
import styles from './WaitlistGroup.module.scss';

class WaitlistGroup extends Component {

  render() {
    return (
      <li>
        <header className={styles.header}>
          <h1 className={styles.title}>{this.props.header}</h1>
        </header>
        <ul className={styles.list}>
          {this.props.items.map(data => (
            <li key={data.id} className={styles.item}>
              <WaitlistItem item={data} />
            </li>
          ))}
        </ul>
      </li>
    );
  }
}

export default WaitlistGroup;
