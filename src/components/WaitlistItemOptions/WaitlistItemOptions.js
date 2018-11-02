import React, { Component } from 'react';
import styles from './WaitlistItemOptions.module.scss';
import CancelableButton from '../CancelableButton/CancelableButton.js';
import Button from '../Button/Button.js';
import ReactSVG from 'react-svg';
import deleteIcon from '../../assets/trash-alt.svg';
import bellIcon from '../../assets/bell.svg';
import editIcon from '../../assets/edit.svg';



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
          <CancelableButton trigger={this.props.onDelete} onStatus={this.statusUpdate} template="Cancel Delete ({countdown})" shouldCleanup={false}>
            <ReactSVG src={deleteIcon} svgClassName={styles.icon} />
          </CancelableButton>

          <CancelableButton trigger={this.props.onNotify} onStatus={this.statusUpdate} template="Cancel Notification ({countdown})">
            <ReactSVG src={bellIcon} svgClassName={styles.icon} />
          </CancelableButton>

          <Button theme="primary" onClick={this.props.onEdit}>
            <ReactSVG src={editIcon} svgClassName={styles.icon} />
          </Button>
        </div>
      </div>
    );
  }
}

export default WaitlistItemOptions;
