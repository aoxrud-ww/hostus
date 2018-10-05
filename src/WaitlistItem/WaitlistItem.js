import React, { Component } from 'react';
import styles from './WaitlistItem.module.scss';
import WaitlistItemOptions from '../WaitlistItemOptions/WaitlistItemOptions.js';

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

  getClassName() {
    return [styles.container, this.state.showOptions && styles.opened].join(' ');
  }

  render() {
    return (
      <div className={this.getClassName()}>
        <a className={styles.mainRow} onClick={this.itemClick} href="javascript:void(0)">
          <div className={styles.name}>
            {this.props.item.name}
          </div>
          <div className={styles.partySize}>
            {this.props.item.partySize}
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
