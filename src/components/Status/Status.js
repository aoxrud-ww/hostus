import React, { PureComponent } from 'react';
import styles from './Status.module.scss';

class Status extends PureComponent {

  render() {
    const classNames = `${styles.status} ${styles[this.props.value]}`;
    return (
      <div className={classNames}/>
    );
  }
}

export default Status;
