import React, { Component } from 'react';
import styles from './Duration.module.scss';
import classnames from 'classnames';


class Duration extends Component {
  getDuration() {
    let value = this.props.value;
    if(this.props.compareTo === 'now') {
      value = Math.round((Date.now() - this.props.value) / 6000);
    }

    console.log(this.props.max, value);
    return {
      value,
      unit: 'min',
      isOverdue: this.props.max && this.props.max > value
    };
  }

  render() {
    const duration = this.getDuration();
    const classNames = classnames({
      [styles.container]: true,
      [styles.overdue]: duration.isOverdue
    });

    return (
      <div className={classNames}>
        <span className={styles.value}>
          {duration.value}
        </span>
        <span className={styles.unit}>
          {duration.unit}
        </span>
      </div>
    );
  }
}

export default Duration;
