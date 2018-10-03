import React, { Component } from 'react';
import styles from './WaitlistItemOptions.module.scss';
import CancelableButton from '../CancelableButton/CancelableButton.js';

class WaitlistItemOptions extends Component {

  statusUpdate(message) {
    console.log(message);
  }

  render() {
    return (
      <div className={styles.container}>
        <CancelableButton trigger={this.props.onDelete} onStatus={this.statusUpdate} template="Cancel Delete ({countdown})">
          Delete
        </CancelableButton>

        <CancelableButton trigger={this.props.onNotify} onStatus={this.statusUpdate} template="Cancel Notification ({countdown})">
          Ready
        </CancelableButton>
      </div>
    );
  }
}

export default WaitlistItemOptions;
