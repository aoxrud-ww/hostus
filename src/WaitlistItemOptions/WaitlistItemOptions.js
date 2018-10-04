import React, { Component } from 'react';
import styles from './WaitlistItemOptions.module.scss';
import CancelableButton from '../CancelableButton/CancelableButton.js';

class WaitlistItemOptions extends Component {

  constructor(props) {
    super(props);
    this.state = {message: ''};
    this.statusUpdate = this.statusUpdate.bind(this);
  }

  statusUpdate(notificationState) {
    let message = '';

    this.setState(state => ({
      message
    }));
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.buttons}>
          <CancelableButton trigger={this.props.onDelete} onStatus={this.statusUpdate} template="Cancel Delete ({countdown})">
            Delete
          </CancelableButton>

          <CancelableButton trigger={this.props.onNotify} onStatus={this.statusUpdate} template="Cancel Notification ({countdown})">
            Ready
          </CancelableButton>
        </div>
      </div>
    );
  }
}

export default WaitlistItemOptions;
