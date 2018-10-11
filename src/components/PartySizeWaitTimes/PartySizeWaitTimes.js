import React, { PureComponent } from 'react';
import styles from './PartySizeWaitTimes.module.scss';
import PropTypes from 'prop-types';

class PartySizeWaitTimes extends PureComponent {
  render() {
    return (
      <div className={styles.container}>Average Wait for {this.props.partySize} is <span className={styles.waitTime}>{this.props.partySize*5} min</span></div>
    );
  }
}

PartySizeWaitTimes.propTypes = {
  partySize: PropTypes.number
}


export default PartySizeWaitTimes;
