import React, { Component } from 'react';
import styles from './WaitlistItem.module.scss';
import WaitlistItemOptions from '../WaitlistItemOptions/WaitlistItemOptions.js';
import Duration from '../Duration/Duration.js';
import Status from '../Status/Status.js';
import classnames from 'classnames';

class WaitlistItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showOptions: false
    };
    this.itemClick = this.itemClick.bind(this);
    this.notify = this.notify.bind(this);
    this.delete = this.delete.bind(this);
  }

  toggleOptions() {
    this.setState((state) => ({
      showOptions: !this.state.showOptions
    }));
  }

  itemClick() {
    this.toggleOptions();
  }

  delete() {
    this.props.onDelete(this.props.item);
  }

  notify() {
    this.props.onNotify(this.props.item);
  }

  render() {
    const classNames = classnames({
      [styles.container]: true,
      [styles.opened]: this.state.showOptions
    });

    return (
      <div className={classNames}>
        <a className={styles.mainRow} onClick={this.itemClick} href="javascript:void(0)">
          <div className={styles.status}>
            <Status value={this.props.item.status} />
          </div>
          <div className={styles.partySize}>
            {this.props.item.partySize}
          </div>
          <div className={styles.name}>
            {this.props.item.name}
            <div className={styles.note}>
              {this.props.item.note}
            </div>
          </div>
          <div className={styles.waiting}>
            <Duration value={this.props.item.createdAt} compareTo="now" max={this.props.item.quoted} />
          </div>
          <div className={styles.quoted}>
            <Duration value={this.props.item.quoted} />
          </div>

        </a>
        <div className={styles.options}>
        {this.state.showOptions && <WaitlistItemOptions onDelete={this.delete} onNotify={this.notify} />}
        </div>
      </div>
    );
  }
}

export default WaitlistItem;
