import React, { Component } from 'react';
import styles from './SearchError.module.scss';
import searchLoupe from '../../assets/search.svg';
import ReactSVG from 'react-svg';

class SearchError extends Component {

  render() {
    return (
      <div className={styles.container}>
        <ReactSVG src={searchLoupe} svgClassName={styles.icon} />
        <h1 className={styles.title}>Could not find any results with {this.props.query}.</h1>
      </div>
    );
  }
}

export default SearchError;
