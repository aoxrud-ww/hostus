import React, { PureComponent } from 'react';
import styles from './Status.module.scss';

class Status extends PureComponent {

  constructor(props) {
    super(props);
    this.classNames = `${styles.status} ${styles[this.props.value]}`;
  }

  render() {
    return (
      <div className={this.classNames}/>
    );
  }
}

export default Status;
