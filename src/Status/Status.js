import React, { Component } from 'react';
import styles from './Status.module.scss';
import classnames from 'classnames';


class Status extends Component {

  constructor(props) {
    super(props);

    this.state = {
      className: `${styles.status} ${styles[this.props.value]}`
    };
  }

  render() {
    return (
      <div className={this.state.className}/>
    );
  }
}

export default Status;
