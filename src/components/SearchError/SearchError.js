import React, { PureComponent } from 'react';
import styles from './SearchError.module.scss';
import searchLoupe from '../../assets/search.svg';
import ReactSVG from 'react-svg';
import PropTypes from 'prop-types';

class EmptyResults extends PureComponent {
  render() {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>There are no parties on the waitlist.</h1>
      </div>
    );
  }
}

class NotFound extends PureComponent {
  render() {
    return (
      <div className={styles.container}>
        <ReactSVG src={searchLoupe} svgClassName={styles.icon} />
        <h1 className={styles.title}>Could not find any results with {this.props.query}.</h1>
      </div>
    );
  }
}

NotFound.defaultProps = {
  query: ''
};

NotFound.propTypes = {
  query: PropTypes.string
};


class SearchError extends PureComponent {
  render() {
    if(this.props.query) {
      return <NotFound query={this.props.query} />;
    } else {
      return <EmptyResults />;
    }
  }
}

SearchError.defaultProps = {
  query: ''
};

SearchError.propTypes = {
  query: PropTypes.string
};

export default SearchError;
