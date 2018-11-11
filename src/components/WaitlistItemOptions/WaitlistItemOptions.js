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
          <Button theme="primary" onClick={this.props.onComplete}>
            <ReactSVG src={checkIcon} svgClassName={styles.icon} />
          </Button>

          {this.props.phone &&
            <CancelableButton trigger={this.props.onNotify}>
              <ReactSVG src={bellIcon} svgClassName={styles.icon} />
            </CancelableButton>
          }

          <CancelableButton trigger={this.props.onDelete} shouldCleanup={false}>
            <ReactSVG src={deleteIcon} svgClassName={styles.icon} />
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
