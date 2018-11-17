import React, { Component } from 'react';
import styles from './WaitlistItemOptions.module.scss';
import CancelableButton from '../CancelableButton/CancelableButton.js';
import Button from '../Button/Button.js';
import ReactSVG from 'react-svg';
import deleteIcon from '../../assets/trash-alt.svg';
import bellIcon from '../../assets/bell.svg';
import editIcon from '../../assets/edit.svg';
import checkIcon from '../../assets/check-mark.svg';



class WaitlistItemOptions extends Component {


  render() {
    return (
      <div className={styles.container}>
        <div className={styles.buttons}>
          <Button theme="secondary" onClick={this.props.onComplete}>
            <ReactSVG src={checkIcon} svgClassName={styles.icon} /> Seat
          </Button>

          {this.props.phone &&
            <CancelableButton trigger={this.props.onNotify}>
              <ReactSVG src={bellIcon} svgClassName={styles.icon} /> Notify
            </CancelableButton>
          }

          <CancelableButton trigger={this.props.onDelete} shouldCleanup={false}>
            <ReactSVG src={deleteIcon} svgClassName={styles.icon} /> Delete
          </CancelableButton>

          <Button theme="secondary" onClick={this.props.onEdit}>
            <ReactSVG src={editIcon} svgClassName={styles.icon} /> Edit
          </Button>
        </div>
      </div>
    );
  }
}

export default WaitlistItemOptions;
