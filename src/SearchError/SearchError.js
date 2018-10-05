import React, { Component } from 'react';
import WaitlistItem from '../WaitlistItem/WaitlistItem.js';
import styles from './SearchError.module.scss';
import searchLoupe from '../assets/search.svg';

class SearchError extends Component {

  render() {
    return (
      <div className={styles.container}>
        <img src={searchLoupe} className={styles.icon} />
        <h1 className={styles.title}>Could not find any results with {this.props.query}.</h1>
      </div>
    );
  }
}

export default SearchError;
