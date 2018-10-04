import React, { Component } from 'react';
import WaitlistGroup from '../WaitlistGroup/WaitlistGroup.js';
import styles from './Waitlist.module.scss';
import { connect } from "react-redux";


class Waitlist extends Component {
  render() {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>{this.props.title}</h1>
        </header>
        <ul className={styles.list}>
          {this.props.list.map(row =>
            (<WaitlistGroup key={row.groupName} header={row.groupName} items={row.list} onDelete={this.props.onDelete} onNotify={this.props.onNotify} />)
          )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { list: state.list };
};


const mapDispatchToProps = {
  onDelete(item) {
    return {
      type: 'delete',
      item
    }
  },
  onNotify(item) {
    return {
      type: 'notify',
      item
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Waitlist);
