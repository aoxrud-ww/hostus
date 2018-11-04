import React, { PureComponent } from 'react';
import styles from './Duration.module.scss';
import classnames from 'classnames';
import PropTypes from 'prop-types';

class Duration extends PureComponent {

  render() {
    const classNames = classnames(styles.container, styles[this.props.size], {
      [styles.overdue]: this.props.isOverdue
    });
    return (
      <div className={classNames}>
        <span className={styles.value}>
          {this.props.value}
        </span>
        <span className={styles.unit}>
          {this.props.unit}
        </span>
      </div>
    );
  }

}

Duration.defaultProps = {
  value: '',
  unit: 'min',
  isOverdue: false,
  size: 'default'
};

Duration.propTypes = {
  value: PropTypes.number,
  unit: PropTypes.string,
  isOverdue: PropTypes.bool,
  size: PropTypes.string
};

export default Duration;
