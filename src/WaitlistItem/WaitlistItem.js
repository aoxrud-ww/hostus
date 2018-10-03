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
  }

  toggleOptions() {
    this.setState((state) => ({
      showOptions: !this.state.showOptions
    }));
  }

  itemClick() {
    this.toggleOptions();
  }

  getClassName() {
    return [styles.container, this.state.showOptions && styles.opened].join(' ');
  }

  render() {
    return (
      <div className={this.getClassName()}>
        <a className={styles.mainRow} onClick={this.itemClick}>
          <div className={styles.name}>
            {this.props.item.name}
          </div>
          <div className={styles.partySize}>
            {this.props.item.partySize}
          </div>
        </a>
        <div className={styles.options}>
        {this.state.showOptions && <WaitlistItemOptions />}
        </div>
      </div>
    );
  }
}

export default WaitlistItem;
